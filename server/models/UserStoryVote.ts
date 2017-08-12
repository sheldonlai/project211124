import {Document, model, Schema} from "mongoose";
import {BaseModel} from './Base/BaseModel';


export class UserStoryVote extends BaseModel {
    user: any;
    story: any;
    upVote: boolean;

    constructor(userId: string, answerId : string, upVote: boolean) {
        super();
        this.user = userId;
        this.story = answerId;
        this.upVote = upVote;
    }
}


export interface IUserStoryVote extends UserStoryVote, Document {}

const schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "user" , required: true},
    story: {type: Schema.Types.ObjectId, ref: "story", required: true},
    upVote: {type: Boolean, required: true}
});

export const UserStoryVoteModel = model<IUserStoryVote>('userStoryVote', schema);
