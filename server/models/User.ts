import {model, Schema, Document} from "mongoose";
import {UserTypeEnum} from "../enums/UserTypeEnum";
import {BaseModel} from './BaseModel';

export class User implements BaseModel {
    id: string;
    email: string;
    name: string;
    role: UserTypeEnum;
    verified: Boolean;
    local: any;
    facebook: any;
}

export interface IUser extends User, Document{}

export const userSchema = new Schema({
    email:           {type: String, required: true, unique: true},
    name:            {type: String, required: true},
    role:            {type: String, enum: ["admin", "mod", "normal"], required: true, default: 'normal'},
    verified:        {type: Boolean, required: true, default: false},
    local:           {
        password:       {type: String},
        salt:           {type: String}
    },
    facebook:         {
        id:             {type: String},
        access_token:   {type: String},
    }
}, {
    timestamps: true
});

// should add pre-save method to ensure local, facebook or google is populated properly

export const UserModel = model<IUser>('user', userSchema);



