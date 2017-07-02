import {model, Schema, Document} from "mongoose";
import {BaseModel} from "./BaseModel";

export class Tag extends BaseModel{
    tag: string;
    constructor(tag: string){
        super();
        this.tag = tag;
    }
}

export interface ITag extends Tag, Document {

}

const schema = new Schema({
    tag: {type:String, required: true, unique: true}
});
export const TagModel = model<ITag>('tag', schema);