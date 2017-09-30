import {model, Schema, Document} from "mongoose";
import {BaseModel} from "./Base/BaseModel";
import * as mongoosastic from "mongoosastic";
import {GetMongoosasticOption} from "../elasticSearch/GetPlugin";
import {esClient} from "../esClient";
export class Tag extends BaseModel{
    tag: string;
    constructor(tag: string){
        super();
        this.tag = tag;
    }
}

export interface ITag extends Tag, Document {

}

export const tagSchema = new Schema({
    tag: {type:String, required: true, unique: true}
});

tagSchema.plugin(mongoosastic, {
    esClient
});

export const TagModel = model<ITag>('tag', tagSchema);