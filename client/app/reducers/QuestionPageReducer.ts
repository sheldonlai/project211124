/**
 * Created by SHELDON on 6/24/2017.
 */
import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {QuestionActionTypes} from "../constants/QuestionActionTypes";
import {FrontEndQuestionModels} from "../models/QuestionModels";
import QuestionPage = FrontEndQuestionModels.QuestionPage;

export interface QuestionPageReducerState {
    status : ReducerStateStatus;
    questionPage : QuestionPage;
    lastUpdated: number;
    error: string;
}

const initialState : QuestionPageReducerState = {
    status : ReducerStateStatus.LOADING,
    questionPage : undefined,
    lastUpdated: Date.now(),
    error : ''
};

export const QuestionPageReducer = (state = initialState, action) : QuestionPageReducerState => {
    switch (action.type) {
        case QuestionActionTypes.FetchQuestionPageRequest:
            return {
                status : ReducerStateStatus.LOADING,
                questionPage : undefined,
                lastUpdated: Date.now(),
                error : ''
            };
        case QuestionActionTypes.FetchQuestionPageOK:
            return {
                status : ReducerStateStatus.DONE,
                questionPage : action.data,
                lastUpdated: Date.now(),
                error : ''
            };
        case QuestionActionTypes.FetchQuestionPageError:
            return {
                status : ReducerStateStatus.ERROR,
                questionPage : state.questionPage,
                lastUpdated: Date.now(),
                error : action.data
            };
        case QuestionActionTypes.EditQuestionRequest:
            return {
                status : ReducerStateStatus.DONE,
                questionPage : action.data,
                lastUpdated: Date.now(),
                error : ''
            };
        case QuestionActionTypes.EditQuestionOK:


        default:
            return state;
    }
};