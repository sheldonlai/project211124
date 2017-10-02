import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {RecruitmentDto} from "../../../server/dtos/recruitment/RecruitmentDto";

export interface RecruitmentPageReducer{
    status: ReducerStateStatus,
    recruitmentPage: RecruitmentDto,
    lastUpdated: number,
}

