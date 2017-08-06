import {model, Schema, Document} from "mongoose";
import {BaseModel} from './Base/BaseModel';
import {User} from './User';
import {Answer} from "./Answer";


export class UserAnswerVote extends BaseModel {
    user: any;
    answer: any;
    upVote: boolean;

    constructor(userId: string, answerId : string, upVote: boolean) {
        super();
        this.user = userId;
        this.answer = answerId;
        this.upVote = upVote;
    }
}


export interface IUserAnswerVote extends UserAnswerVote, Document {}

const schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "user" , required: true},
    answer: {type: Schema.Types.ObjectId, ref: "answer", required: true},
    upVote: {type: Boolean, required: true}
});

export const UserAnswerVoteModel = model<IUserAnswerVote>('userAnswerVote', schema);
