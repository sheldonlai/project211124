import {model, Schema, Document} from 'mongoose';
import {BaseModel} from './Base/BaseModel';
import {Question, QuestionComment} from './Question';
import {User, userSchema} from './User';
import {RawDraftContentState} from "draft-js";
import {QuestionDto} from "../dtos/q&a/QuestionDto";

let mongoosastic = require("mongoosastic");

export class Answer extends BaseModel {
    question: any;
    content: RawDraftContentState;
    author: any;
    upVotes: number;
    downVotes: number;
    lastEditedUtc: Date;
    createdUtc: Date;
    comments: QuestionComment[];

    constructor(question: Question|QuestionDto, content: RawDraftContentState, author: User, comments?: QuestionComment[]) {
        super();
        this.question = question;
        this.content = content;
        this.author = author;
        this.comments = (comments == null) ? [] : comments;
    }

}

export interface IAnswer extends Answer, Document {

}

const schema = new Schema({
    question: {type: Schema.Types.ObjectId, ref: 'question', required: true, es_indexed: true},
    content: {type: Schema.Types.Mixed, required: true, es_indexed: true},
    author: {
        type: Schema.Types.ObjectId, ref: 'user', required: true,
        es_indexed: true, es_schema: userSchema, es_select: 'username'
    },
    lastEditedUtc: {type: Date, default: Date.now},
    createdUtc: {type: Date, default: Date.now, es_indexed: true},
    comments: [{
        commentBy: {type: Schema.Types.ObjectId, ref: 'user'},
        commentContent: {type: String, required: true, es_indexed: true},
        lastEditedUtc: {type: Date, default: Date.now},
        createdUtc: {type: Date, default: Date.now}
    }]
});

const autoPopulateUsers = function (next) {
    this.populate(['author', "comments.commentBy"]);
    next();
};

schema.pre('findOne', autoPopulateUsers).pre('find', autoPopulateUsers);
schema.plugin(mongoosastic, {
    populate: [
        {path: 'author', select: 'username'}
    ]
});

export const AnswerModel = model<IAnswer>('answer', schema);
