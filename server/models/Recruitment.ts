import {Document, model, Schema} from "mongoose";
import {University, universitySchema} from "./LocationModels/Universities";
import {City} from "./LocationModels/Cities";
import {BaseModel} from "./Base/BaseModel";
import {User, userSchema} from "./User";
import {UniversityYearEnum} from "../enums/UniversityYearEnum";
import {listNumericalEnumValues} from "../utils/EnumsUtil";
import {QuestionDifficulty} from "./Question";
import {DifficultyLevel, QuestionEducationLevel} from "../enums/QuestionEducationLevel";
import {RecruitStatus} from "../enums/RecruitmentStatusEnum";
import {RecruitmentRequestEnum} from "../enums/RecruitmentRequestEnum";
import {RawDraftContentState} from "draft-js";
import {RecruitmentDto} from "../dtos/recruitment/RecruitmentDto";
import {DraftJsHelper} from "../utils/DraftJsHelper";

let mongoosastic = require("mongoosastic");

export class RecruitmentComment{
    _id: any;
    request: RecruitmentRequestEnum;
    comment: string;
    createdBy: User;
    createdAt: Date;
    updatedAt: Date;
    // TODO: add year and semester, tags
    constructor(score: boolean, comment:string, createdBy: User){
        this.request = RecruitmentRequestEnum.NOT_SPECIFIED;
        this.comment = comment;
        this.createdBy = createdBy;
    }
}

export class Recruitment extends BaseModel{
    comments: RecruitmentComment[];
    groupMates: User[];
    createdAt: Date;
    updatedAt: Date;
    views: number;
    constructor(
        public title: string,
        public content: RawDraftContentState,
        public recruitStatus: RecruitStatus,
        public createdBy: User,
        public university?: University,
        public courseDifficulty?: QuestionDifficulty,
    ){
        super();
        this.createdAt = new Date(Date.now());
        this.updatedAt = new Date(Date.now());
        this.comments = [];
        this.groupMates = [];
        this.views = 0;
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
            request: {type: String, enum: Object.keys(RecruitmentRequestEnum), default: RecruitmentRequestEnum.NOT_SPECIFIED},
            comment: {type: String},
            createdBy: {type: Schema.Types.ObjectId, ref: 'user'},
            createdAt: {type: Date, default: Date.now()},
            updatedAt: {type: Date, default: Date.now()},
        }
    ],
    groupMates: [
        {type: Schema.Types.ObjectId, ref: 'user'}
    ],
    views: {type: Number, default: 0},
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

export const RecruitmentModel = model<IRecruitment>('recruitment', schema);