import {model, Schema, Document, Types} from "mongoose";
import {UserTypeEnum} from "../enums/UserTypeEnum";
import {BaseModel} from './Base/BaseModel';
import {AppError} from "../errors/AppError";
import {University, UniversityModel, universitySchema} from "./LocationModels/Universities";
import {Country, CountryModel, CountrySchema} from "./LocationModels/Country";
import * as mongoosastic from "mongoosastic";
import {isString} from "util";

export class User extends BaseModel {
    email: string;
    username: string;
    role: UserTypeEnum;
    verified: boolean;
    local?: LocalProfile;
    facebook?: FacebookProfile;
    university: University;
    company: string;
    country: Country;
    points: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        email: string, name: string, role: UserTypeEnum, local?: LocalProfile, facebook?: FacebookProfile
    ){
        super();
        this.email = email;
        this.username = name;
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
    email:           {type: String, required: true, unique: true, es_indexed: true},
    username:        {type: String, required: true, unique: true, es_indexed: true},
    role:            {type: String, enum: Object.keys(UserTypeEnum), required: true, default: 'normal', es_indexed: true},
    verified:        {type: Boolean, required: true, default: false},
    local:           {type: LocalSubSchema, es_indexed: false},
    facebook:        {type: FacebookSubSchema},
    university:      {
                        type: Schema.Types.ObjectId, ref: 'university',
                        es_schema: universitySchema, es_indexed: true,  es_select: 'name'
    },
    country:         {
                        type: Schema.Types.ObjectId, ref: 'country',
                        es_schema: CountrySchema, es_indexed: true,  es_select: 'name'
    },
    company:         {type: String},
    points:          {type: Number, default: 0},
}, {
    timestamps: true
});

userSchema.pre('save', function(nextFunction) {
    if (!this.local && !this.facebook) {
        nextFunction(new AppError("Either local or facebook profile must be defined"));
    }
    nextFunction();
});

const autoPopulateInfo = function(next) {
    this.populate(['country', "university"]);
    next();
};

userSchema.pre('findOne', autoPopulateInfo).pre('find', autoPopulateInfo);
userSchema.plugin(mongoosastic, {
    populate: [
        {path: "university", select: "name"},
        {path: "country", select: "name"},
    ]
});

export const UserModel = model<IUser>('user', userSchema);



