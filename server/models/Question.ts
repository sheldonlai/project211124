import {model, Schema, Document} from "mongoose";
import {BaseModel} from './BaseModel';
import {User} from './User';
import {PublicityStatus} from "../enums/PublicityStatus";

export class QuestionComment {
    commentBy : User;
    commentContent : string;
    lastEditedUtc : Date;

    constructor(user: User, content: string){
        this.commentBy = user;
        this.commentContent = content;
    }
}

export class Question extends BaseModel{
    title: string;
    content: string;
    author: any;
    tags : any[];
    upVotes : number;
    downVotes: number;
    isPublished : boolean;
    lastEditedUtc : Date;
    comments : QuestionComment[];
    publicityStatus:  PublicityStatus;
    constructor(
        title:string, content: string, author: User | string, tags:any[],
        isPublished? : boolean, publicityStatus?:  PublicityStatus
    ){
        super();
        this.title = title;
        this.content = content;
        this.author = author;
        this.tags = tags;
        this.isPublished = isPublished? isPublished: false;
        this.publicityStatus = publicityStatus? publicityStatus: PublicityStatus.PUBLIC;
    }
}

export interface IQuestion extends Question, Document{

}

const schema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    tags: [{type: Schema.Types.ObjectId, ref: 'tag' }],
    isPublished:  {type: Boolean, default: false},
    upVotes: {type: Number, default: 0},
    downVotes : {type : Number, default: 0},
    resolved: {type: Boolean, default: false},
    lastEditedUtc: {type : Date, default: Date.now},
    publicityStatus: {
        type: String,
        enum: [
            PublicityStatus.PUBLIC,
            PublicityStatus.PAID_AND_INVITE,
            PublicityStatus.INVITE_ONLY
        ]
    },
    uploads: [
        {fileUrl : String}
    ],
    comments: [{
        commentBy : {type: Schema.Types.ObjectId, ref: 'user'},
        commentContent : {type: String , required: true},
        lastEditedUtc: {type : Date, default: Date.now}
    }]
});
export const QuestionModel = model<IQuestion>('question', schema);
