import {QuestionComment, QuestionDifficulty} from "../../models/Question";
import {UserDto} from "../auth/UserDto";
import {RawDraftContentState} from "draft-js";
import {RecruitmentCommentDto} from "./RecruitmentCommenDto";
import {University} from "../../models/LocationModels/Universities";
import {RecruitStatus} from "../../enums/RecruitmentStatusEnum";
import {EditorState} from "draft-js";
import {SemesterEnum} from "../../enums/SemesterEnum";

export interface RecruitmentDto{
    _id: string;
    title: string;
    comments: RecruitmentCommentDto[];
    content: RawDraftContentState;
    recruitmentYear: number;
    recruitmentSemester: SemesterEnum;
    recruitStatus: RecruitStatus;
    university?: University;
    courseDifficulty?: QuestionDifficulty;
    createdBy: UserDto;
    createdAt: Date;
    updatedAt: Date;
    groupMates: UserDto[];
    views: number;
}