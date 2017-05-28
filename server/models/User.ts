import {model, Schema, Document} from "mongoose";
import {UserTypeEnum} from "../enums/UserTypeEnum";
import {BaseModel} from './BaseModel';

export class User extends BaseModel {
    email: string;
    name: string;
    role: UserTypeEnum;
    verified: Boolean;
    local?: LocalProfile;
    facebook?: FacebookProfile;

    constructor(
        email: string, name: string, role: UserTypeEnum, local?: LocalProfile, facebook?: FacebookProfile
    ){
        super();
        this.email = email;
        this.name = name;
        this.role = role;
        this.verified = false;
        this.local = local;
        this.facebook = facebook;
    }
}

export class LocalProfile {
    password: string;
    salt: string;

    constructor(password: string, salt: string) {
        this.password = password;
        this.salt = salt;
    }
}

export class FacebookProfile {
    id: string;
    access_token: string;

    constructor(id: string, access_token: string) {
        this.id = id;
        this.access_token = access_token;
    }
}

export interface IUser extends User, Document{}

const LocalSubSchema = new Schema({
    password:        {type: String, required: true},
    salt:            {type: String, required: true}
}, {
    _id: false
});

const FacebookSubSchema = new Schema({
    id:              {type: String, required: true},
    access_token:    {type: String, required: true},
}, {
    _id: false
});

export const userSchema = new Schema({
    email:           {type: String, required: true, unique: true},
    name:            {type: String, required: true},
    role:            {type: String, enum: [UserTypeEnum.ADMIN, UserTypeEnum.MOD, UserTypeEnum.NORMAL], required: true, default: 'normal'},
    verified:        {type: Boolean, required: true, default: false},
    local:           {type: LocalSubSchema},
    facebook:        {type: FacebookSubSchema}
}, {
    timestamps: true
});

userSchema.pre('save', function(nextFunction) {
    if (!this.local && !this.facebook) {
        nextFunction(new Error("Either local or facebook profile must be defined"));
    }
    nextFunction();
});

export const UserModel = model<IUser>('user', userSchema);



