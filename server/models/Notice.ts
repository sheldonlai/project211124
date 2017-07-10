import {model, Schema, Document} from "mongoose";
import {NoticeType} from "../enums/NoticeType";
import {RepeatPatternEnum} from "../enums/RepeatPatternEnum";

export interface RepeatPattern {
    type: RepeatPatternEnum;
    gap: number;
};

export class Notice {
    recipient: any;
    sender: any;
    type: NoticeType;
    repeatPattern: RepeatPattern;
    message: string;
    iconUrl: string;

    constructor(
        recipientId: Schema.Types.ObjectId, type: NoticeType,
        message: string, senderId?: Schema.Types.ObjectId, pattern? : RepeatPattern
    ){
        this.recipient = recipientId;
        this.type = type;
        this.message = message;
        this.sender = senderId;
        this.repeatPattern = pattern;
    }
}

export interface INotice extends Notice, Document {

}

const schema = new Schema({
    recipient: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    sender: {type: Schema.Types.ObjectId, ref: 'user'}, // Optional because system can send a notice as well
    type: {type: String, enum: Object.keys(NoticeType), required: true},
    repeatPattern: {
        type: {type: String, enum: Object.keys(RepeatPatternEnum)},
        gap: {type: Number}
    },
    message: {type: String, required: true},
    iconUrl: {type: String}

});
export const QuestionModel = model<INotice>('notice', schema);