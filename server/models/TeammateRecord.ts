import {model, Schema, Document} from "mongoose";
import {NoticeType} from "../enums/NoticeType";
import {RepeatPatternEnum} from "../enums/RepeatPatternEnum";
import {University} from "./LocationModels/Universities";
import {City} from "./LocationModels/Cities";
import {Country} from "./LocationModels/Country";
import {BaseModel} from "./BaseModel";
import {User} from "./User";

export class TeammateRecord extends BaseModel{

    ratings: {
        _id: any;
        rating: number;
        comment: string;
        created: User;
        createdAt: Date;
        upDatedAt: Date;
    }[];

    constructor(
        public firstName: string,
        public lastName: string,
        public description: string,
        public city?: City,
        public university?: University,
        public year?: number
    ){
        super();
    }
}

export interface ITeammateRecord extends TeammateRecord, Document {}

const schema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    year: {type: Number},
    university: {type: Schema.Types.ObjectId, ref: "university"},
    city: {type: Schema.Types.ObjectId, ref: "city"},
    description: {type: String},
    createdAt: {type: Date, default: Date.now()},
    ratings: [
        {
            rating: {type: Number, max: 5, min: 0},
            comment: {type: String},
            createdBy: {type: Schema.Types.ObjectId, ref: 'user'},
            createdAt: {type: Date, default: Date.now()},
            updatedAt: {type: Date, default: Date.now()}
        }
    ]
});

export const TeammateRecordModel = model<ITeammateRecord>('teammateRecord', schema);