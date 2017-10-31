import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {RecruitmentDto} from "../../../server/dtos/recruitment/RecruitmentDto";
import {RecruitmentActionTypes} from "../constants/action.types/RecruitmentActionTypes";
import {FrontEndRecruitmentModels} from "../models/RecruitmentModels";
import Recruitment = FrontEndRecruitmentModels.Recruitment;
import {DraftJsHelper} from "../../../server/utils/DraftJsHelper";

export interface RecruitmentPageReducerState{
    status: ReducerStateStatus,
    recruitmentPage: Recruitment,
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

        case RecruitmentActionTypes.AddCommentRequest:
            return getLoadingState(state);
        case RecruitmentActionTypes.AddCommentOK:
            return getOKState(state, action.data);

        case RecruitmentActionTypes.EditCommentRequest:
            return getLoadingState(state);
        case RecruitmentActionTypes.EditCommentOK:
            return getOKState(state, action.data);

        case RecruitmentActionTypes.RecruitMemberRequest:
            return getLoadingState(state);
        case RecruitmentActionTypes.RecruitMemberOK:
            return getOKState(state, action.data);

        case RecruitmentActionTypes.EditRecruitmentRequest:
            return getLoadingState(state);
        case RecruitmentActionTypes.EditRecruitmentOK:
            return getOKState(state, action.data);

        case RecruitmentActionTypes.JoinRecruitmentRequest:
            return getLoadingState(state);
        case RecruitmentActionTypes.JoinRecruitmentOK:
            return getOKState(state, action.data);

        case RecruitmentActionTypes.UpdateRecruitmentRequestRequest:
            return getLoadingState(state);
        case RecruitmentActionTypes.UpdateRecruitmentRequestOK:
            return getOKState(state, action.data);

        default:
            return state;
    }
};