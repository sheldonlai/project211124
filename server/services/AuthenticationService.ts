import {IUserRepository} from "../repositories/UserRepository";
import {LocalProfile, User} from "../models/User";
import StringUtils from "../../common/utils/stringUtils";
import {UserTypeEnum} from "../enums/UserTypeEnum";
import {TokenDto} from '../../common/dtos/auth/TokenDto';
import {config} from "../config";
import {AppError} from "../../common/errors/AppError";

export interface IAuthenticationService{
    /**
     *  Creates an account in the repository for a new user.
     * @param email the email of the user.
     * @param name the full name of the user
     * @param password the password of the user
     * @returns the user created
     * @throws email must not been used
     */
    registerLocalUser(email: string, name: string, password: string): Promise<User>;

    login(username: string , password: string) : Promise<any>;
}

export class AuthenticationService implements IAuthenticationService{

    private userRepository : IUserRepository;
    private privateKey : string;
    private jwt : any;

    constructor(
        userRepository : IUserRepository,
    ){
        this.userRepository = userRepository;
        this.privateKey = config.jwt.secretKey;
        this.jwt = require('jsonwebtoken');
    }

    registerLocalUser(email: string, name: string, password: string): Promise<User> {
        return this.userRepository.getByEmail(email)
            .then((existingUser: User) => {
                if (existingUser) {
                    throw new AppError("Entered e-mail is already in use.");
                } else {
                    let salt: string = StringUtils.genRandomString(16);
                    let passwordHash = StringUtils.hashString(password, salt);
                    let localProfile = new LocalProfile(passwordHash, salt);
                    let newUser = new User(email, name, UserTypeEnum.NORMAL, localProfile);
                    return this.userRepository.create(newUser) // TODO:should never return passwords. need a "secured profile"
                }
            })
    }

    login(email: string, password: string): Promise<TokenDto> {
        return this.userRepository.getByEmail(email).then((user : User) => {
            if (!user){
                throw new AppError("The account does not exists!");
            } else {
                let salt = user.local.salt;
                let passwordHash = StringUtils.hashString(password, salt);
                if (user.local.password != passwordHash){
                    // incorrect pass
                    throw new AppError("Wrong credentials, please try again");
                }
                let token = this.jwt.sign(user, this.privateKey, {algorithm: 'RS384'});
                return { token : token };
            }
        });
    }



}

