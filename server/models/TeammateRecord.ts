import {Document, model, Schema} from "mongoose";
import {University} from "./LocationModels/Universities";
import {City} from "./LocationModels/Cities";
import {BaseModel} from "./BaseModel";
import {User} from "./User";
import {UniversityYearEnum} from "../enums/UniversityYearEnum";
import {listNumericalEnumValues} from "../utils/EnumsUtil";

export interface AcademicInfo {
    university: University,
    year: UniversityYearEnum,
    _id?: string
}

export class TeammateRecord extends BaseModel{

    ratings: {
        _id: any;
        rating: number;
        comment: string;
        createdBy: User;
        createdAt: Date;
        upDatedAt: Date;
    }[];

    constructor(
        public firstName: string,
        public lastName: string,
        public description: string,
        public academicInfo?: AcademicInfo,
        public city?: City,
    ){
        super();
    }
}

export interface ITeammateRecord extends TeammateRecord, Document {}

const schema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    academicInfo: {
        university: {type: Schema.Types.ObjectId, ref: "university"},
        year: {
            type: Number,
            enum: listNumericalEnumValues(UniversityYearEnum)
        }
    },
    city: {type: Schema.Types.ObjectId, ref: "city"},
    description: {type: String},
    ratings: [
        {
            rating: {type: Number, max: 5, min: 0},
            comment: {type: String},
            createdBy: {type: Schema.Types.ObjectId, ref: 'user'},
            createdAt: {type: Date, default: Date.now()},
            updatedAt: {type: Date, default: Date.now()}
        }
    ]
},{
    timestamps: true
});

const autoPopulateUsers = function(next) {
    this.populate(["ratings.commentBy"]);
    next();
};

schema.pre('findOne', autoPopulateUsers).pre('find', autoPopulateUsers);

export const TeammateRecordModel = model<ITeammateRecord>('teammateRecord', schema);