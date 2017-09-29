import {UserDto} from "../auth/UserDto";
import {RecruitmentRequestEnum} from "../../enums/RecruitmentRequestEnum";

export interface RecruitmentCommentDto{
    _id: any;
    request: RecruitmentRequestEnum;
    comment: string;
    createdBy: UserDto;
    createdAt: Date;
    updatedAt: Date;
}