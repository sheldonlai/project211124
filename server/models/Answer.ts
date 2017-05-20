import {model, Schema, Document} from "mongoose";


export class Answer {
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

export interface IAnswer extends Answer, Document{

}

const schema = new Schema({
    title: {type: String, required: true},
    question: {type: Schema.Types.ObjectId, ref : 'question'},
    content: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    upVotes: {type: Number},
    downVotes : {type : Number},
    lastEditedUtc: {type: Date, default: Date.now},
    comments: [{
        commentBy : {type: Schema.Types.ObjectId, ref: 'user'},
        commentContent : {type: String , required: true},
        lastEditedUtc:  {type: Date, default: Date.now}
    }]
});
export const AnswerModel = model<IAnswer>('answer', schema);
