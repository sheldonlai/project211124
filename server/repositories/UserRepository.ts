import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {IUser, User, UserModel} from "../models/User";

export interface IUserRepository extends IBaseRepository<User>{
    getByEmail(email: string): Promise<User>
}

export class UserRepository extends BaseRepository<User, IUser> implements IUserRepository {

    constructor() {
        super(UserModel)
    }

    getByEmail(email: string): Promise<User> {
        return UserModel.findOne({email: email}).lean().exec()
            .then((user: User)=> user);
    }

    protected applyRestriction(user: User): User {
        delete user.local;
        delete user.facebook;
        return user;
    }

}