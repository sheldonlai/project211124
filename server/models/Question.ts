import {model, Schema, Document} from "mongoose";
import {BaseModel} from './BaseModel';
import {User} from './User';

export class QuestionComments {
    commentBy : User;
    commentContent : string;
    lastEditedUtc : string;
}

export class Question extends BaseModel{
    title: string;
    content: string;
    author: any;
    tags : any[];
    isPublished : boolean;
    lastEditedUtc : Date;
    comments : QuestionComments[];

    constructor(
        title:string, content: string, author: User, tags:any[], isPublished : boolean
    ){
        super();
        this.title = title;
        this.content = content;
        this.author = author;
        this.tags = tags;
    }
};

export interface IQuestion extends Question, Document{

}

const schema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    tags: [{type: Schema.Types.ObjectId, ref: 'tag' }],
    isPublished:  Boolean,
    lastEditedUtc: {type : Date, default: Date.now},
    comments: [{
        commentBy : {type: Schema.Types.ObjectId, ref: 'user'},
        commentContent : {type: String , required: true},
        lastEditedUtc: {type : Date, default: Date.now}
    }]
});
export const QuestionModel = model<IQuestion>('question', schema);
