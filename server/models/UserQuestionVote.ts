import {BaseModel} from "./BaseModel";
import {User} from "./User";
import {Answer} from "./Answer";
import {model, Schema, Document} from "mongoose";

export class UserQuestionVote extends BaseModel {
    user: any;
    question: any;
    upVote: boolean;

    constructor(userId: string, questionId : string, upVote: boolean) {
        super();
        this.user = userId;
        this.question = questionId;
        this.upVote = upVote;
    }
}


export interface IUserQuestionVote extends UserQuestionVote, Document {}

const schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "user" , required: true},
    question: {type: Schema.Types.ObjectId, ref: "question", required: true},
    upVote: {type: Boolean, required: true}
});

export const UserQuestionVoteModel = model<IUserQuestionVote>('userQuestionVote', schema);
