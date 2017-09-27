import {QuestionComment, QuestionDifficulty} from "../../models/Question";
import {UserDto} from "../auth/UserDto";
import {RawDraftContentState} from "draft-js";
import {RecruitmentCommentDto} from "./RecruitmentCommenDto";
import {University} from "../../models/LocationModels/Universities";

enum RecruitStatus {
    Open,
    Close,
    NOT_SPECIFIED,
}

export interface RecruitmentDto{
    comments: RecruitmentCommentDto[];
    content: RawDraftContentState;
    recruitStatus: RecruitStatus;
    university?: University;
    courseDifficulty?: QuestionDifficulty;
    createdBy: UserDto;
    createdAt: Date;
    updatedAt: Date;
    groupMates: UserDto[];
}