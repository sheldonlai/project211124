import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {RecruitmentDto} from "../../../server/dtos/recruitment/RecruitmentDto";
import {Recruitment} from "../../../server/models/Recruitment";
import {RecruitmentActionTypes} from "../constants/action.types/RecruitmentActionTypes";

export interface RecruitmentPageReducerState{
    status: ReducerStateStatus,
    recruitmentPage: RecruitmentDto,
    lastUpdated: number,
}

const initialState: RecruitmentPageReducerState = {
    status: ReducerStateStatus.LOADING,
    recruitmentPage: undefined,
    lastUpdated: 0,
};

const getLoadingState = (state): RecruitmentPageReducerState => {
    let newState = {...state};
    newState.status = ReducerStateStatus.LOADING;
    return newState;
};

const getOKState = (state, data): RecruitmentPageReducerState => {
    let newState = {...state};
    newState.status = ReducerStateStatus.DONE;
    newState.recruitmentPage = data;
    newState.lastUpdated = Date.now();
    return newState;
};

export const RecruitmentPageReducer = (state = initialState, action): RecruitmentPageReducerState => {
    switch(action.type){
        case RecruitmentActionTypes.FetchRecruitmentPageRequest:
            return getLoadingState(state);
        case RecruitmentActionTypes.FetchRecruitmentPageOK:
            return getOKState(state, action.data);

        default:
            return state;
    }
};