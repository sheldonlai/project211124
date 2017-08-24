import {Document, model, Schema} from "mongoose";
import {University, universitySchema} from "./LocationModels/Universities";
import {City} from "./LocationModels/Cities";
import {BaseModel} from "./Base/BaseModel";
import {User, userSchema} from "./User";
import {UniversityYearEnum} from "../enums/UniversityYearEnum";
import {listNumericalEnumValues} from "../utils/EnumsUtil";
import * as mongoosastic from "mongoosastic";

export interface AcademicInfo {
    university: University,
    year: UniversityYearEnum
}

export class TeammateRating{
    _id: any;
    rating: number;
    comment: string;
    createdBy: User;
    createdAt: Date;
    updatedAt: Date;
    constructor(score: number, comment:string, createdBy: User){
        this.rating = score;
        this.comment = comment;
        this.createdBy = createdBy;
    }
}

export class TeammateRecord extends BaseModel{

    ratings: TeammateRating[];

    constructor(
        public firstName: string,
        public lastName: string,
        public description: string,
        public createdBy: User,
        public university?: University,
        public year?: UniversityYearEnum,
        public city?: City,
    ){
        super();
        this.ratings = [];
    }
}

export interface ITeammateRecord extends TeammateRecord, Document {}

const schema = new Schema({
    firstName: {type: String, es_indexed: true},
    middleName: {type: String, es_indexed: true},
    lastName: {type: String, es_indexed: true},
    university: {
        type: Schema.Types.ObjectId, ref: "university",
        es_schema: universitySchema, es_indexed: true, es_select: 'name'
    },
    year: {
        type: Number,
        enum: listNumericalEnumValues(UniversityYearEnum),
        es_indexed: true
    },
    city: {type: Schema.Types.ObjectId, ref: "city"},
    description: {type: String, es_indexed: true},
    createdBy: {
        type: Schema.Types.ObjectId, ref: "user", required: true,
        es_schema: userSchema, es_indexed: true, es_select: 'username'
    },
    ratings: [
        {
            rating: {type: Number, max: 5, min: 0, es_indexed: true},
            comment: {type: String},
            createdBy: {type: Schema.Types.ObjectId, ref: 'user'},
            createdAt: {type: Date, default: Date.now()},
            updatedAt: {type: Date, default: Date.now()},

        }
    ]
},{
    timestamps: true
});

const autoPopulateUsers = function(next) {
    this.populate(["createdBy", "ratings.createdBy", "university"]);
    next();
};

schema.pre('findOne', autoPopulateUsers).pre('find', autoPopulateUsers);
schema.plugin(mongoosastic, {
    populate: [
        {path: 'university', select: 'name'},
        {path: 'createdBy', select: 'username'}
    ]
});

export const TeammateRecordModel = model<ITeammateRecord>('teammateRecord', schema);