import {model, Schema, Document} from "mongoose";
import {UserTypeEnum} from "../enums/UserTypeEnum";

export interface IUser extends Document {
    name: string;
    hashedPassword: string;
    email: string;
    role: UserTypeEnum;
    accesses: any;
    tags: Array<any>;
    passwordResetToken?: string;
    friends: Array<any>;
    teams: Array<any>;
}

export const userSchema = new Schema({
    name: {type: String, required: true, unique: true},
    hashedPassword: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String, enum: ["admin", "mod", "normal"]},
    accesses: [{type: Schema.Types.ObjectId, ref: 'Access'}],
    tags: [{type: Schema.Types.ObjectId, ref: 'Category'}],
    passwordResetToken: {type: String, unique: true},
    friends: [{type: Schema.Types.ObjectId, ref: 'user'}],
    teams: [{type: Schema.Types.ObjectId, ref: 'Team'}],
    history: [
        {
            module : {types : String, enum: ["team" , "tournament", "story"]},
            date : Date,
            tag : {type: Schema.Types.ObjectId, ref: 'tag'}
        }
    ]
});

export const UserModel = model<IUser>('user', userSchema);


