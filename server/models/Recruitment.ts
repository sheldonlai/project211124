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
import {RecruitmentRequestEnum, RequestStateEnum} from "../enums/RecruitmentRequestEnum";
import {RawDraftContentState} from "draft-js";
import {RecruitmentDto} from "../dtos/recruitment/RecruitmentDto";
import {DraftJsHelper} from "../utils/DraftJsHelper";
import {esClient} from "../esClient";
import {RecruitmentCommentDto} from "../dtos/recruitment/RecruitmentCommenDto";
import {UserDto} from "../dtos/auth/UserDto";
import {RecruitmentPreviewDto} from "../dtos/recruitment/RecruitmentPreviewDto";
import {SemesterEnum} from "../enums/SemesterEnum";

let mongoosastic = require("mongoosastic");

export class RecruitmentComment{
    _id: any;
    request: RecruitmentRequestEnum;
    comment: RawDraftContentState;
    createdBy: User;
    createdAt: Date;
    updatedAt: Date;
    constructor(request: RecruitmentRequestEnum, comment:RawDraftContentState, createdBy: User){
        this.request = request;
        this.comment = comment;
        this.createdBy = createdBy;
        this.createdAt = new Date(Date.now());
        this.updatedAt = new Date(Date.now());
    }
}

export class RecruitmentRequest{
    _id: any;
    createdBy: User;
    createdAt: Date;
    status: RequestStateEnum;
    message?: string;

    constructor(createdBy: User, message?: string){
        this.createdBy = createdBy;
        this.message = message? message: "";
        this.createdAt = new Date();
        this.status = RequestStateEnum.PENDING;
    }
}

export class Recruitment extends BaseModel{
    title: string;
    content: RawDraftContentState;
    recruitStatus: RecruitStatus;
    recruitmentYear: number;
    recruitmentSemester: SemesterEnum;
    createdBy: User;
    university: University;
    courseDifficulty: QuestionDifficulty;
    comments: RecruitmentComment[];
    groupMates: User[];
    createdAt: Date;
    updatedAt: Date;
    pendingRequests: RecruitmentRequest[];
    views: number;
    constructor(
        title?: string,
        content?: RawDraftContentState,
        recruitStatus?: RecruitStatus,
        createdBy?: User,
        university?: University,
        courseDifficulty?: QuestionDifficulty,
        recruitmentYear?: number,
        recruitmentSemester?: SemesterEnum
    ){
        super();
        this.title = title;
        this.content = content;
        this.recruitStatus = recruitStatus;
        this.createdBy = createdBy;
        this.university = university;
        this.courseDifficulty = courseDifficulty;
        this.createdAt = new Date(Date.now());
        this.updatedAt = new Date(Date.now());
        this.comments = [];
        this.groupMates = [];
        this.pendingRequests = [];
        this.views = 0;
        this.recruitmentYear = recruitmentYear?recruitmentYear:(new Date()).getFullYear();
        this.recruitmentSemester = recruitmentSemester?recruitmentSemester: SemesterEnum.NOT_SPECIFIED;
    }

    static fromObject(obj: Partial<Recruitment>): Recruitment {
        let object = new Recruitment();
        for (let key of Object.keys(obj)) {
            object[key] = obj[key]
        }
        return object;
    }

    toPreviewDto(): RecruitmentPreviewDto{
        let previewDto: RecruitmentPreviewDto = {
            _id: this._id,
            title: this.title,
            content: DraftJsHelper.convertRawToText(this.content),
            author: this.createdBy,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            university: this.university,
            courseDifficulty: this.courseDifficulty,
            groupSize: this.groupMates.length,
            views: this.views,
        }
        return previewDto;
    }
}

export interface IRecruitment extends Recruitment, Document {}

const schema = new Schema({
    title: {type: String, required: true, es_indexed: true},
    content: {type: Schema.Types.Mixed, required: true, es_indexed: true},
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
            comment: {type: Schema.Types.Mixed},
            createdBy: {type: Schema.Types.ObjectId, ref: 'user'},
            createdAt: {type: Date, default: Date.now()},
            updatedAt: {type: Date, default: Date.now()},
        }
    ],
    groupMates: [
        {type: Schema.Types.ObjectId, ref: 'user'}
    ],
    pendingRequests:[
        {
            createdBy: {type: Schema.Types.ObjectId, ref: 'user'},
            createdAt: {type: Date, default: Date.now()},
            message: {type: String, default: ""},
            status: {type: String, enum: Object.keys(RequestStateEnum), default: RequestStateEnum.PENDING},
        }
    ],
    views: {type: Number, default: 0},
    recruitmentYear: {type: Number, default: (new Date()).getFullYear()},
    recruitmentSemester: {type: String, enum: Object.keys(SemesterEnum), default: SemesterEnum.NOT_SPECIFIED},
},{
    timestamps: true
});

const autoPopulateUsers = function(next) {
    this.populate(["createdBy", "comments.createdBy", "university", "groupMates"]);
    next();
};

schema.pre('findOne', autoPopulateUsers).pre('find', autoPopulateUsers);
schema.plugin(mongoosastic, {
    populate: [
        {path: 'university', select: 'name'},
        {path: 'createdBy', select: 'username'},
        {path: 'groupMates', select: 'username'}
    ],
    esClient
});

export const RecruitmentModel = model<IRecruitment>('recruitment', schema);