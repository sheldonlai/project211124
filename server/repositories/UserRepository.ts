/**
 * Created by Phillip on 2017-05-28.
 */

import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {injectable} from "inversify";
import {IUser, User, UserModel} from "../models/User";

export interface IUserRepository extends IBaseRepository<User>{
}

@injectable()
export class UserRepository extends BaseRepository<User, IUser> implements IUserRepository{

    constructor() {
        super(UserModel)
    }

}