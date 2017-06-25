/**
 * Created by Phillip on 2017-06-24.
 */
/* grab the things we need */
import {model, Schema, Document} from "mongoose";
import {User} from "./User";
import {BaseModel} from "./BaseModel";

export class EmailVerification extends BaseModel{
    user: string;
    code: string;
    dateAdded: Date;

    constructor(userId: string, code: string, dateAdded: Date) {
        super();
        this.user = userId;
        this.code = code;
        this.dateAdded = dateAdded;
    }
}

export interface IEmailVerification extends EmailVerification, Document {}

/* A schema for email verification */
const emailVerificationSchema = new Schema({
    user:      { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
    code:      { type: String, required: true, unique: true, index: true },
    dateAdded: { type: Date, required: true, default: Date.now() }
});


export const EmailVerificationModel = model<IEmailVerification>('emailVerification', emailVerificationSchema);
