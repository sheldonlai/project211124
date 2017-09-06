import {AuthActionTypes} from "../constants/action.types/AuthActionTypes";
import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {CommonController} from "../api.controllers/CommonController";
import * as JwtDecode from 'jwt-decode';
import {UserActionTypes} from "../constants/action.types/UserActionTypes";
import {UserDto} from "../../../server/dtos/auth/UserDto";
import {FrontEndQuestionModels} from "../models/QuestionModels";
import Question = FrontEndQuestionModels.Question;
import {FrontEndStoryModels} from "../models/StoryModels";
import Story = FrontEndStoryModels.Story;
import {DashboardActionTypes} from "../constants/action.types/DashboardActionTypes";
import StoryPreview = FrontEndStoryModels.StoryPreview;
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;
import {DashboardDto} from "../../../server/dtos/dashboard/DashboardDto";
export interface DashboardReducerState {
    status: ReducerStateStatus;
    hot: (QuestionPreview|StoryPreview)[];
}

const initialState: DashboardReducerState = {
    status: ReducerStateStatus.LOADING,
    hot: []
};

const getLoadingState = (state: DashboardReducerState) => {
    state = {...state};
    state.status = ReducerStateStatus.LOADING;
    return state;
};

const getOkState = (state, data) => {
    state = {...state};
    state.hot = data.hottest;
    return state;
};

export const DashboardReducer = (state = initialState, action): DashboardReducerState => {
    switch (action.type) {
        case DashboardActionTypes.FetchDashboardDataReq:
            return getLoadingState(state);
        case DashboardActionTypes.FetchDashboardDataOK:
            return getOkState(state, action.data);
        case DashboardActionTypes.FetchDashboardDataErr:
            return state;
        default:
            return state;
    }
};