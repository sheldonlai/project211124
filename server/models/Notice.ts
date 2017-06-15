

import {model, Schema, Document} from "mongoose";
import {NoticeType} from "../enums/NoticeType";
export class Notice {

}

export interface INotice extends Notice, Document{

}

const schema = new Schema({
    recipient: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    sender: {type: Schema.Types.ObjectId, ref: 'user'}, // Optional because system can send a notice as well
    type : {type: String, enum : [NoticeType.ONE_TIME, NoticeType.REPEATED], required: true},
    repeatPattern: {
        type: { type: String, enum : ['weekly', 'daily', 'monthly']}, // TODO: Create Enums for it
        gap : {type : Number}
    },
    message : {type: String},
    iconUrl : {type: String}

});
export const QuestionModel = model<INotice>('question', schema);