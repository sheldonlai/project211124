import {RecruitmentRequestEnum} from "../../../server/enums/RecruitmentRequestEnum";
import {Draft} from "draft-js";
import {UserDto} from "../../../server/dtos/auth/UserDto";
import {RecruitStatus} from "../../../server/enums/RecruitmentStatusEnum";
import {University} from "../../../server/models/LocationModels/Universities";
import {QuestionDifficulty} from "../../../server/models/Question";
import {RecruitmentCommentDto} from "../../../server/dtos/recruitment/RecruitmentCommenDto";
import {DraftJsHelper} from "../../../server/utils/DraftJsHelper";
export namespace FrontEndRecruitmentModels{
    import EditorState = Draft.Model.ImmutableData.EditorState;
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
        comment: RecruitmentComment[];
        content: EditorState;
        recruitStatus: RecruitStatus;
        university?: University;
        courseDifficulty?: QuestionDifficulty;
        createdBy: UserDto;
        createdAt: Date;
        updatedAt: Date;
        groupMates: UserDto[];
        views: number;
        constructor(){
            this._id = '';
            this.title = '';
            this.comment = [];
            this.content = EditorState.createEmpty();
            this.recruitStatus = RecruitStatus.NOT_SPECIFIED;
            this.university = undefined;
            this.courseDifficulty = undefined;
            this.createdBy = undefined;
            this.createdAt = new Date(Date.now());
            this.updatedAt = new Date(Date.now());
            this.groupMates = [];
            this.views = 0;
        }
    }

    export const commentModelToDto = (comment: RecruitmentComment): RecruitmentCommentDto => {
        let commentDto: RecruitmentcommentDto = {
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

}