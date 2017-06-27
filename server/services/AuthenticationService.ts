import {IUserRepository} from "../repositories/UserRepository";
import {LocalProfile, User} from "../models/User";
import {UserTypeEnum} from "../enums/UserTypeEnum";
import {AppError} from "../errors/AppError";
import StringUtils from "../utils/stringUtils";
import {TokenDto} from "../dtos/auth/TokenDto";
import {generateToken} from "../utils/JsonWebTokenUtil";
import {BaseService} from "./BaseService";
import {ClientError} from "../errors/HttpStatus";
import {IEmailVerificationRepository} from "../repositories/EmailVerificationRepository";
import {EmailVerification} from "../models/EmailVerification";
import {IMailService} from "./MailService";
import {SendMailOptions} from "nodemailer";
import {MailOptionsBuilder} from "./builders/MailOptionsBuilder";
import {TemplatesProvider} from "./TemplatesProvider";

export interface IAuthenticationService {
    /**
     *  Creates an account in the repository for a new user.
     * @param email the email of the user.
     * @param name the full name of the user
     * @param password the password of the user
     * @returns the user created
     * @throws email must not been used
     */
    registerLocalUser(email: string, name: string, password: string): Promise<User>;

    /**
     *  Login an account using username + password.
     * @param username account username
     * @param password account password before hashed
     * @returns Returns a JWT token with 7 days expiry date.
     * @throws incorrect combination of username and password
     */
    login(username: string, password: string): Promise<TokenDto>;

    sendEmailVerification(currentUser: User): Promise<any>

    verifyAccount(code: string): Promise<User>;
}

export class AuthenticationService extends BaseService implements IAuthenticationService {

    private mailService: IMailService;
    private userRepository: IUserRepository;
    private emailVerificationRepository: IEmailVerificationRepository;
    private templateProvider: TemplatesProvider = new TemplatesProvider();

    constructor(mailService: IMailService,
                userRepository: IUserRepository,
                emailVerificationRepository: IEmailVerificationRepository) {
        super();
        this.mailService = mailService;
        this.userRepository = userRepository;
        this.emailVerificationRepository = emailVerificationRepository;
    }

    registerLocalUser(email: string, name: string, password: string): Promise<User> {
        let newUser: User;
        return this.userRepository.getByEmail(email)
            .then((existingUser: User) => {
                if (existingUser) {
                    throw new AppError("Entered e-mail is already in use.");
                } else {
                    let salt: string = StringUtils.genRandomString(16);
                    let passwordHash = StringUtils.hashString(password, salt);
                    let localProfile = new LocalProfile(passwordHash, salt);
                    let user = new User(email, name, UserTypeEnum.NORMAL, localProfile);
                    return this.userRepository.create(user);
                }
            }).then((userCreated) => {
                newUser = userCreated;
                return this.sendEmailVerification(newUser);
            }).then(() => {
                return newUser;
            })
    }

    login(email: string, password: string): Promise<TokenDto> {
        return this.userRepository.getByEmail(email)
            .then((user: User) => {
                if (!user) {
                    throw new AppError("The account does not exists!");
                } else {
                    let salt = user.local.salt;
                    let passwordHash = StringUtils.hashString(password, salt);
                    if (user.local.password != passwordHash) {
                        // incorrect pass
                        throw new AppError("Wrong credentials, please try again");
                    }
                    delete user.local;
                    let token = generateToken(user);
                    return {token: token};
                }
            });
    }

    sendEmailVerification(currentUser: User): Promise<any> {
        let code: string = StringUtils.genRandomString(32);
        let html: string = this.templateProvider.emailVerification(currentUser.username, code);
        console.log(html);
        let options: SendMailOptions = new MailOptionsBuilder()
            .setReceiver(currentUser.email)
            .setSubject("Askalot is asking you to confirm") // Get string from messages
            .setHTML(html)
            .build();
        return this.mailService.sendMail(options);
    }

    verifyAccount(code: string): Promise<User> {
        return this.emailVerificationRepository.findByCode(code)
            .then((emailVerification: EmailVerification) => {
                if (!emailVerification) {
                    throw new AppError("Invalid confirmation code");
                } else {
                    return this.userRepository.getById(emailVerification.code);
                }
            }).then((user: User) => {
                if (user.verified) {
                    throw new AppError("Account already verified.", ClientError.BAD_REQUEST);
                } else {
                    user.verified = true; // delete verification entity
                    return this.userRepository.update(user);
                }
            })
    }

}

