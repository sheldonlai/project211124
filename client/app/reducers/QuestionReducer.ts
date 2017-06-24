import {AuthActionTypes} from "../constants/AuthActionTypes";
import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {QuestionPreview} from "../../../server/dtos/q&a/QuestionPreview";
import {QuestionPreviewDto} from "../../../server/dtos/q&a/QuestionPreviewDto";
import {QuestionActionTypes} from "../constants/QuestionActionTypes";

export interface QuestionReducerState {
    status : ReducerStateStatus;
    featuredQuestions :  QuestionPreview[];
    myQuestions : QuestionPreview[];
    lastUpdated: number;
    error: string;
}

const initialState : QuestionReducerState = {
    status : ReducerStateStatus.LOADING,
    featuredQuestions : [],
    myQuestions : [],
    lastUpdated: Date.now(),
    error : ''
};

export const QuestionReducer = (state = initialState, action) : QuestionReducerState => {
    switch (action.type) {
        case QuestionActionTypes.QuestionPreviewsRequest:
            return {
                status : ReducerStateStatus.LOADING,
                featuredQuestions: state.featuredQuestions,
                myQuestions: state.myQuestions,
                lastUpdated: state.lastUpdated,
                error : ''
            };
        case QuestionActionTypes.QuestionPreviewsOK:
            let data: QuestionPreviewDto = action.data;
            return {
                status : ReducerStateStatus.DONE,
                featuredQuestions: data.featuredQuestions,
                myQuestions: data.myQuestions,
                lastUpdated: Date.now(),
                error : ''
            };
        case QuestionActionTypes.QuestionPreviewsError:
            return {
                status : ReducerStateStatus.ERROR,
                featuredQuestions: [],
                myQuestions: [],
                lastUpdated: state.lastUpdated,
                error : ''
            };
        default:
            return state;
    }
};