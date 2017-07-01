import {model, Schema, Document} from 'mongoose';
import {BaseModel} from './BaseModel';
import {Question, QuestionComment} from './Question';
import {User} from './User';
import {RawDraftContentState} from "draft-js";

export class Answer extends BaseModel{
    question: any;
    content: RawDraftContentState;
    author: any;
    upVotes : number;
    downVotes: number;
    lastEditedUtc : Date;
    createdUtc : Date;
    comments: QuestionComment[];

    constructor(
        question: Question, content: RawDraftContentState, author: User, comments?: QuestionComment[]
    ){
        super();
        this.question = question;
        this.content = content;
        this.author = author;
        this.comments = (comments == null)? [] : comments;
    }

}

export interface IAnswer extends Answer, Document{

}

const schema = new Schema({
    question: {type: Schema.Types.ObjectId, ref : 'question', required: true},
    content: {type: Schema.Types.Mixed, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    upVotes: {type: Number, default: 0},
    downVotes : {type : Number, default: 0},
    lastEditedUtc: {type: Date, default: Date.now},
    createdUtc : {type: Date, default: Date.now},
    comments: [{
        commentBy : {type: Schema.Types.ObjectId, ref: 'user'},
        commentContent : {type: String , required: true},
        lastEditedUtc:  {type: Date, default: Date.now}
    }]
});
export const AnswerModel = model<IAnswer>('answer', schema);
