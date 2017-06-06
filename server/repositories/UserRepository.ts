/**
 * Created by Phillip on 2017-05-28.
 */

import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {injectable} from "inversify";
import {IUser, User, UserModel} from "../models/User";

export interface IUserRepository extends IBaseRepository<User>{
    getByEmail(email: string): Promise<User>
}

@injectable()
export class UserRepository extends BaseRepository<User, IUser> implements IUserRepository {

    constructor() {
        super(UserModel)
    }

    getByEmail(email: string): Promise<User> {
        return UserModel.findOne({email: email}).lean().exec()
    }

    protected applyRestriction(user: User): User {
        delete user.local;
        delete user.facebook;
        return user;
    }

}