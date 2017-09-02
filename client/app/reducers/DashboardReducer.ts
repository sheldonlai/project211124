import {AuthActionTypes} from "../constants/AuthActionTypes";
import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {CommonController} from "../api.controllers/CommonController";
import * as JwtDecode from 'jwt-decode';
import {UserActionTypes} from "../constants/UserActionTypes";
import {UserDto} from "../../../server/dtos/auth/UserDto";
import {FrontEndQuestionModels} from "../models/QuestionModels";
import Question = FrontEndQuestionModels.Question;
import {FrontEndStoryModels} from "../models/StoryModels";
import Story = FrontEndStoryModels.Story;
import {DashboardActionTypes} from "../constants/DashboardActionTypes";
export interface DashboardReducerState {
    status: ReducerStateStatus;
    stories: Story[];
    questions: Question[];
}

const initialState: DashboardReducerState = {
    status: ReducerStateStatus.LOADING,
    stories: [],
    questions: []
};

const getLoadingState = (state: DashboardReducerState) => {
    state = {...state};
    state.status = ReducerStateStatus.LOADING;
    return state;
};

const getOkState = (state, data) => {
    state = {...state};
    state.stories = data.stories;
    state.questions = data.questions;
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