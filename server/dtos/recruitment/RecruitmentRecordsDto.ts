import {UserDto} from "../auth/UserDto";
import {RecruitmentDto} from "./RecruitmentDto";
import {RequestStateEnum} from "../../enums/RecruitmentRequestEnum";

export interface RecruitmentRecordEntityDto{
    recruitment: RecruitmentDto;
    status: RequestStateEnum;
}

export interface RecruitmentRecordsDto{
    _id: string;
    user: UserDto;
    records: RecruitmentRecordEntityDto[];
}