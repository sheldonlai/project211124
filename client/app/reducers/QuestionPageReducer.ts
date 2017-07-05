/**
 * Created by SHELDON on 6/24/2017.
 */
import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {QuestionActionTypes} from "../constants/QuestionActionTypes";
import {FrontEndQuestionModels} from "../models/QuestionModels";
import QuestionPage = FrontEndQuestionModels.QuestionPage;
import cloneQuestionPage = FrontEndQuestionModels.cloneQuestionPage;

export interface QuestionPageReducerState {
    status: ReducerStateStatus;    // status of the state
    questionPage: QuestionPage;    // main data of the reducer
    lastUpdated: number;            // date to determine if it should fetch again
    error: string;                  // error message to display
}

const initialState: QuestionPageReducerState = {
    status: ReducerStateStatus.LOADING,
    questionPage: undefined,
    lastUpdated: Date.now(),
    error: ''
};

export const QuestionPageReducer = (state = initialState, action): QuestionPageReducerState => {
    switch (action.type) {
        case QuestionActionTypes.FetchQuestionPageRequest:
            return {
                status: ReducerStateStatus.LOADING,
                questionPage: undefined,
                lastUpdated: state.lastUpdated,
                error: ''
            };
        case QuestionActionTypes.FetchQuestionPageOK:
            return {
                status: ReducerStateStatus.DONE,
                questionPage: action.data,
                lastUpdated: Date.now(),
                error: ''
            };
        case QuestionActionTypes.FetchQuestionPageError:
            return {
                status: ReducerStateStatus.ERROR,
                questionPage: state.questionPage,
                lastUpdated: state.lastUpdated,
                error: action.data
            };
        case QuestionActionTypes.EditQuestionRequest:
            return {
                status: ReducerStateStatus.LOADING,
                questionPage: state.questionPage,
                lastUpdated: state.lastUpdated,
                error: ''
            };
        case QuestionActionTypes.EditQuestionOK:
            // clone question page so that changing this object wont change the current state
            let questionPage = cloneQuestionPage(state.questionPage);
            questionPage.question = action.data;
            return {
                status: ReducerStateStatus.DONE,
                questionPage: questionPage,
                lastUpdated: Date.now(),
                error: ''
            };
        case QuestionActionTypes.EditAnswerError:
            return {
                status: ReducerStateStatus.ERROR,
                questionPage: state.questionPage,
                lastUpdated: state.lastUpdated,
                error: action.data ? action.data : 'An unexpected error has occurred.'
            };

        default:
            return state;
    }
};