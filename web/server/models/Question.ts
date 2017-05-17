import {model, Schema, Document} from "mongoose";


export interface IQuestion extends Document {
    title: string;
    content: string;
    author: any;
    tags : any;
    groups: any[];
    isPublished : boolean;
    lastEditedUtc : Date;
};

export const schema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    tags: [{type: Schema.Types.ObjectId, ref: 'tag' }],
    isPublished:  Boolean,
    lastEditedUtc: Date,
    comments: [{
        commentAuthor : {type: Schema.Types.ObjectId, ref: 'user'},
        commentContent : {type: String , required: true},
        lastEditedUtc: Date
    }]
});
export const Question = model<IQuestion>('story', schema);
