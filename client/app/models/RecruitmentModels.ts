import {RecruitmentRequestEnum, RequestStateEnum} from "../../../server/enums/RecruitmentRequestEnum"
import {UserDto} from "../../../server/dtos/auth/UserDto";
import {RecruitStatus} from "../../../server/enums/RecruitmentStatusEnum";
import {University} from "../../../server/models/LocationModels/Universities";
import {QuestionDifficulty} from "../../../server/models/Question";
import {RecruitmentCommentDto} from "../../../server/dtos/recruitment/RecruitmentCommenDto";
import {DraftJsHelper} from "../../../server/utils/DraftJsHelper";
import {RecruitmentDto, RecruitmentRequestDto} from "../../../server/dtos/recruitment/RecruitmentDto";
import {EditorState} from "draft-js";
import {DifficultyLevel, QuestionEducationLevel} from "../../../server/enums/QuestionEducationLevel";
import {Preview} from "./CommonModels";
import {UniversityDto} from "../../../server/dtos/location/UniversityDto";
import {RecruitmentPreviewDto} from "../../../server/dtos/recruitment/RecruitmentPreviewDto";
import {Routes} from "../constants/Routes";
import {SemesterEnum} from "../../../server/enums/SemesterEnum";

export namespace FrontEndRecruitmentModels{
    export class RecruitmentRequest {
        _id: string;
        createdBy: UserDto;
        createdAt: Date;
        status: RequestStateEnum;
        message?: string;
        constructor(){
            this._id = '';
            this.createdBy = undefined;
            this.createdAt = new Date();
            this.status = RequestStateEnum.PENDING;
            this.message = '';
        }
    }

    export class RecruitmentComment {
        _id: string;
        request: RecruitmentRequestEnum;
        comment: EditorState;
        createdBy: UserDto;
        createdAt: Date;
        updatedAt: Date;
        constructor(){
            this._id = '';
            this.createdBy = undefined;
            this.createdAt = new Date(Date.now());
            this.updatedAt = new Date(Date.now());
            this.comment = EditorState.createEmpty();
            this.request = RecruitmentRequestEnum.NOT_SPECIFIED;
        }
    }

    export class Recruitment {
        _id: string;
        title: string;
        comments: RecruitmentComment[];
        content: EditorState;
        recruitmentYear: number;
        recruitmentSemester: SemesterEnum;
        recruitStatus: RecruitStatus;
        university?: University;
        courseDifficulty?: QuestionDifficulty;
        createdBy: UserDto;
        createdAt: Date;
        updatedAt: Date;
        groupMates: UserDto[];
        pendingRequests: RecruitmentRequest[];
        views: number;
        constructor(){
            this._id = '';
            this.title = '';
            this.comments = [];
            this.content = EditorState.createEmpty();
            this.recruitmentYear = (new Date()).getFullYear();
            this.recruitmentSemester = SemesterEnum.NOT_SPECIFIED;
            this.recruitStatus = RecruitStatus.NOT_SPECIFIED;
            this.university = undefined;
            this.courseDifficulty = {
                educationLevel: QuestionEducationLevel.NOT_SPECIFIED,
                difficultyLevel: DifficultyLevel.NOT_SPECIFIED,
            };
            this.createdBy = undefined;
            this.createdAt = new Date(Date.now());
            this.updatedAt = new Date(Date.now());
            this.groupMates = [];
            this.pendingRequests = [];
            this.views = 0;
        }
    }

    export const requestModelToDto = (request: RecruitmentRequest): RecruitmentRequestDto => {
        let requestDto: RecruitmentRequestDto = {
            _id: request._id,
            createdBy: request.createdBy,
            createdAt: request.createdAt,
            status: request.status,
            message: request.message,
        };
        return requestDto;
    };

    export const requestDtoToModel = (requestDto: RecruitmentRequestDto): RecruitmentRequest => {
        let requestModel: RecruitmentRequest = new RecruitmentRequest();
        requestModel._id = requestDto._id;
        requestModel.createdBy = requestDto.createdBy;
        requestModel.createdAt = requestDto.createdAt;
        requestModel.status = requestDto.status;
        requestModel.message = requestDto.message;
        return requestModel;
    };

    export const commentModelToDto = (comment: RecruitmentComment): RecruitmentCommentDto => {
        let commentDto: RecruitmentCommentDto = {
            _id: comment._id,
            request: comment.request,
            comment: DraftJsHelper.convertEditorStateToRaw(comment.comment),
            createdBy: comment.createdBy,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
        };
        return commentDto;
    }

    export const commentDtoToModel = (comment: RecruitmentCommentDto): RecruitmentComment => {
        let commentModel: RecruitmentComment = new RecruitmentComment();
        commentModel._id = comment._id;
        commentModel.updatedAt = comment.updatedAt;
        commentModel.createdAt = comment.createdAt;
        commentModel.createdBy = comment.createdBy;
        commentModel.comment = DraftJsHelper.convertRawToEditorState(comment.comment);
        commentModel.request = comment.request;
        return commentModel;
    }

    export const recruitmentDtoToModel = (recruitmentDto: RecruitmentDto): Recruitment => {
        let recruitment: Recruitment = new Recruitment();
        let comments: RecruitmentComment[] = recruitmentDto.comments.map(comment => {
            return commentDtoToModel(comment);
        });
        let requests: RecruitmentRequest[] = recruitmentDto.pendingRequests? recruitmentDto.pendingRequests.map(request => {
            return requestDtoToModel(request);
        }): [];
        recruitment._id = recruitmentDto._id;
        recruitment.title = recruitmentDto.title;
        recruitment.comments = comments;
        recruitment.content = DraftJsHelper.convertRawToEditorState(recruitmentDto.content);
        recruitment.recruitmentYear = recruitmentDto.recruitmentYear;
        recruitment.recruitmentSemester = recruitmentDto.recruitmentSemester;
        recruitment.recruitStatus = recruitmentDto.recruitStatus;
        recruitment.university = recruitmentDto.university;
        recruitment.courseDifficulty = recruitmentDto.courseDifficulty;
        recruitment.createdBy = recruitmentDto.createdBy;
        recruitment.createdAt = recruitmentDto.createdAt;
        recruitment.updatedAt = recruitmentDto.updatedAt;
        recruitment.groupMates = recruitmentDto.groupMates;
        recruitment.pendingRequests = requests;
        recruitment.views = recruitmentDto.views;
        return recruitment;
    }

    export const recruitmentModelToDto = (recruitmentModel: Recruitment): RecruitmentDto => {
        let comments: RecruitmentCommentDto[] = recruitmentModel.comments.map(comment => {
            return commentModelToDto(comment);
        });
        let requests: RecruitmentRequestDto[] = recruitmentModel.pendingRequests?recruitmentModel.pendingRequests.map(request => {
            return requestModelToDto(request);
        }): [];
        let recruitmentDto: RecruitmentDto = {
            _id: recruitmentModel._id,
            title: recruitmentModel.title,
            comments: comments,
            content: DraftJsHelper.convertEditorStateToRaw(recruitmentModel.content),
            recruitmentYear: recruitmentModel.recruitmentYear,
            recruitmentSemester: recruitmentModel.recruitmentSemester,
            recruitStatus: recruitmentModel.recruitStatus,
            university: recruitmentModel.university,
            courseDifficulty: recruitmentModel.courseDifficulty,
            createdBy: recruitmentModel.createdBy,
            createdAt: recruitmentModel.createdAt,
            updatedAt: recruitmentModel.updatedAt,
            groupMates: recruitmentModel.groupMates,
            pendingRequests: requests,
            views: recruitmentModel.views,
        };
        return recruitmentDto;
    }

    export class RecruitmentPreview implements Preview{
        _id: string;
        title: string;
        content: string;
        author: UserDto;
        createdAt: Date;
        updatedAt: Date;
        university: UniversityDto;
        courseDifficulty: QuestionDifficulty;
        groupSize: number;
        views: number;
        createdUtc: Date;

        constructor(){
            this._id = '';
            this.title = '';
            this.content = '';
            this.author = undefined;
            this.createdAt = new Date(Date.now());
            this.updatedAt = new Date(Date.now());
            this.university = undefined;
            this.courseDifficulty = {
                educationLevel: QuestionEducationLevel.NOT_SPECIFIED,
                difficultyLevel: DifficultyLevel.NOT_SPECIFIED,
            };
            this.groupSize = 0;
            this.views = 0;
            this.createdUtc = this.createdAt;
        }

        static recruitmentPreviewModelToDto(preview: RecruitmentPreviewDto): RecruitmentPreview{
            let object: RecruitmentPreview = new RecruitmentPreview();
            for ( let key of Object.keys(preview)) {
                object[key] = preview[key];
            }
            return object;
        }

        toLink() {
            let title = encodeURIComponent(this.title).replace(/%20/g, '-');
            title = encodeURIComponent(title).replace(/%3F/g, '');
            return Routes.recruitment_by_id.replace(':id', this._id).replace(':name', title);
        }
    }
}