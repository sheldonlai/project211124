import {model, Schema, Document} from "mongoose";


export interface IAnswer {
    id: string;
    title: string;
    question: any;
    content: string;
    author: any;
    upVotes : number;
    downVotes: number;
    groups: any[];
    lastEditedUtc : Date;
};

export interface IAnswerDocument extends IAnswer, Document{

}

const schema = new Schema({
    title: {type: String, required: true},
    question: {type: Schema.Types.ObjectId, ref : 'question'},
    content: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    upVotes: {type: Number},
    downVotes : {type : Number},
    lastEditedUtc: Date,
    comments: [{
        commentBy : {type: Schema.Types.ObjectId, ref: 'user'},
        commentContent : {type: String , required: true},
        lastEditedUtc: Date
    }]
});
export const Answer = model<IAnswerDocument>('story', schema);
