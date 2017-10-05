import {UserDto} from "../auth/UserDto";
import {RecruitmentRequestEnum} from "../../enums/RecruitmentRequestEnum";
import {RawDraftContentState} from "draft-js";

export interface RecruitmentCommentDto{
    _id: any;
    request: RecruitmentRequestEnum;
    comment: RawDraftContentState;
    createdBy: UserDto;
    createdAt: Date;
    updatedAt: Date;
}