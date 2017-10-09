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
import {esClient} from "../esClient";
import {RecruitmentCommentDto} from "../dtos/recruitment/RecruitmentCommenDto";
import {UserDto} from "../dtos/auth/UserDto";

let mongoosastic = require("mongoosastic");

export class RecruitmentComment{
    _id: any;
    request: RecruitmentRequestEnum;
    comment: RawDraftContentState;
    createdBy: User;
    createdAt: Date;
    updatedAt: Date;
    // TODO: add year and semester, tags
    constructor(request: RecruitmentRequestEnum, comment:RawDraftContentState, createdBy: User){
        this.request = request;
        this.comment = comment;
        this.createdBy = createdBy;
        this.createdAt = new Date(Date.now());
        this.updatedAt = new Date(Date.now());
    }
}

export class Recruitment extends BaseModel{
    title: string;
    content: RawDraftContentState;
    recruitStatus: RecruitStatus;
    createdBy: User;
    university: University;
    courseDifficulty: QuestionDifficulty;
    comments: RecruitmentComment[];
    groupMates: User[];
    createdAt: Date;
    updatedAt: Date;
    views: number;
    constructor(
        title: string,
        content: RawDraftContentState,
        recruitStatus: RecruitStatus,
        createdBy: User,
        university?: University,
        courseDifficulty?: QuestionDifficulty,
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
        this.views = 0;
    }
}

export interface IRecruitment extends Recruitment, Document {}

function commentModelToDto(comment: RecruitmentCommentDto){
    let commentDto: RecruitmentCommentDto = {
        _id: comment._id,
        request: comment.request,
        comment: comment.comment,
        createdBy: comment.createdBy,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
    };
    return commentDto;
}

export function recruitmentModelToDto(recruitment: Recruitment, groupMates: UserDto[]){
    let commentsDto = recruitment.comments.map(comment => {return commentModelToDto(comment)});
    let recruitmentDto = {
        _id: recruitment._id,
        title: recruitment.title,
        comments: commentsDto,
        content: recruitment.content,
        recruitStatus: recruitment.recruitStatus,
        university: recruitment.university,
        courseDifficulty: recruitment.courseDifficulty,
        createdAt: recruitment.createdAt,
        updatedAt: recruitment.updatedAt,
        groupMates: groupMates,
        views: recruitment.views,
    };
    return recruitmentDto;
}

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
    ],
    esClient
});

export const RecruitmentModel = model<IRecruitment>('recruitment', schema);