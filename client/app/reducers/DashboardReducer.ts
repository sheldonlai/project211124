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
export interface DashboardReducerState {
    status: ReducerStateStatus;
    featured: (Question|Story)[];
}

const initialState: DashboardReducerState = {
    status: ReducerStateStatus.LOADING,
    featured: [],

};

export const DashboardReducer = (state = initialState, action): DashboardReducerState => {
    switch (action.type) {

        default:
            return state;
    }
};