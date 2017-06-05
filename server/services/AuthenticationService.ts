/**
 * Created by Phillip on 2017-06-03.
 */

import {injectable, inject} from "inversify";
import {IQuestionRepository} from "../repositories/QuestionRepository";
import TYPES from '../enums/ClassTypes';
import {IAnswerRepository} from '../repositories/AnswerRepository';
import {IUserRepository} from "../repositories/UserRepository";
import {LocalProfile, User} from "../models/User";
import StringUtils from "../../common/utils/stringUtils";
import {UserTypeEnum} from "../enums/UserTypeEnum";

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
}

@injectable()
export class AuthenticationService implements IAuthenticationService{

    private userRepository : IUserRepository;

    constructor(
        @inject(TYPES.IUserRepo)  userRepository : IUserRepository,
    ){
        this.userRepository = userRepository;
    }

    registerLocalUser(email: string, name: string, password: string): Promise<User> {
        return this.userRepository.getByEmail(email)
            .then((existingUser: User) => {
                if (existingUser) {
                    throw new Error("Entered e-mail is already in use.")
                } else {
                    let salt: string = StringUtils.genRandomString(16);
                    let passwordHash = StringUtils.hashString(password, salt);
                    let localProfile = new LocalProfile(passwordHash, salt);
                    let newUser = new User(email, name, UserTypeEnum.NORMAL, localProfile);
                    return this.userRepository.create(newUser) // TODO:should never return passwords. need a "secured profile"
                }
            }).catch(function(err) {
                throw err;
            })
    }

}

