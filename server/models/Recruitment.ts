import {Document, model, Schema} from "mongoose";
import {University, universitySchema} from "./LocationModels/Universities";
import {City} from "./LocationModels/Cities";
import {BaseModel} from "./Base/BaseModel";
import {User, userSchema} from "./User";
import {UniversityYearEnum} from "../enums/UniversityYearEnum";
import {listNumericalEnumValues} from "../utils/EnumsUtil";
import * as mongoosastic from "mongoosastic";
import {QuestionDifficulty} from "./Question";
import {DifficultyLevel, QuestionEducationLevel} from "../enums/QuestionEducationLevel";

enum RecruitStatus {
    Open,
    Close,
    NOT_SPECIFIED,
}

enum RequestToJoin{
    Yes,
    No,
    NOT_SPECIFIED,
}

export class RecruitmentComment{
    _id: any;
    request: RequestToJoin;
    comment: string;
    createdBy: User;
    createdAt: Date;
    updatedAt: Date;
    constructor(score: boolean, comment:string, createdBy: User){
        this.request = RequestToJoin.NOT_SPECIFIED;
        this.comment = comment;
        this.createdBy = createdBy;
    }
}

export class Recruitment extends BaseModel{
    comments: RecruitmentComment[];
    groupMates: User[];
    constructor(
        public title: string,
        public content: string,
        public recruitStatus: RecruitStatus,
        public createdBy: User,
        public createdAt: Date,
        public updatedAt: Date,
        public university?: University,
        public courseDifficulty?: QuestionDifficulty,
    ){
        super();
        this.comments = [];
        this.groupMates = [];
    }
}

export interface IRecruitment extends Recruitment, Document {}

const schema = new Schema({
    title: {type: String, es_indexed: true},
    content: {type: String, es_indexed: true},
    recruitStatus: {
        type: String,
        enum: Object.keys(RecruitStatus),
        default: RecruitStatus.NOT_SPECIFIED,
        es_indexed: true
    },
    university: {
        type: Schema.Types.ObjectId, ref: "university",
        es_schema: universitySchema, es_indexed: true, es_select: 'name'
    },
    courseDifficulty: {
        educationLevel: {
            type: String,
            enum: Object.keys(QuestionEducationLevel),
            default: QuestionEducationLevel.NOT_SPECIFIED,
            es_indexed: true
        },
        difficultyLevel: {
            type: Number,
            enum: listNumericalEnumValues(DifficultyLevel),
            default: DifficultyLevel.NOT_SPECIFIED,
            es_indexed: true
        }
    },
    createdBy: {
        type: Schema.Types.ObjectId, ref: "user", required: true,
        es_schema: userSchema, es_indexed: true, es_select: 'username'
    },
    comments: [
        {
            request: {type: String, enum: Object.keys(RequestToJoin), default: RequestToJoin.NOT_SPECIFIED},
            comment: {type: String},
            createdBy: {type: Schema.Types.ObjectId, ref: 'user'},
            createdAt: {type: Date, default: Date.now()},
            updatedAt: {type: Date, default: Date.now()},
        }
    ],
    groupMates: [
        {type: Schema.Types.ObjectId, ref: 'user'}
    ],
},{
    timestamps: true
});

const autoPopulateUsers = function(next) {
    this.populate(["createdBy", "comments.createdBy", "university"]);
    next();
};

schema.pre('findOne', autoPopulateUsers).pre('find', autoPopulateUsers);
schema.plugin(mongoosastic, {
    populate: [
        {path: 'university', select: 'name'},
        {path: 'createdBy', select: 'username'}
    ]
});

export const TeammateRecordModel = model<IRecruitment>('recruitment', schema);