
import {UserDto} from "../dtos/auth/UserDto";
import {IUserRepository} from "../repositories/UserRepository";
import {User} from "../models/User";
import {generateToken} from "../utils/JsonWebTokenUtil";

export interface IUserService {
    updateUser(user: UserDto, currentUser: User): Promise<{token: string}>;
}

export class UserService implements IUserService{
    constructor(
        private userRepository: IUserRepository
    ) {}

    updateUser(user: UserDto, currentUser: User): Promise<{token: string}> {
        currentUser.country = user.country;
        currentUser.university = user.university;
        currentUser.company = user.company;
        return this.userRepository.update(currentUser).then((user: User) => {
            return this.userRepository.getById(user._id).then((user : User) => {
                return {token: generateToken(user)};
            });
        });
    }
}