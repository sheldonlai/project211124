import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {QuestionActionTypes} from "../constants/action.types/QuestionActionTypes";
import {FrontEndQuestionModels} from "../models/QuestionModels";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;
import QuestionPreviewCollections = FrontEndQuestionModels.QuestionPreviewCollections;
import Question = FrontEndQuestionModels.Question;

export interface QuestionHomeReducerState {
    status : ReducerStateStatus;
    featuredQuestions :  QuestionPreview[];
    myQuestions : QuestionPreview[];
    lastUpdated: number;
    error: string;
}

const initialState : QuestionHomeReducerState = {
    status : ReducerStateStatus.LOADING,
    featuredQuestions : [],
    myQuestions : [],
    lastUpdated: Date.now(),
    error : ''
};

export const QuestionHomeReducer = (state = initialState, action) : QuestionHomeReducerState => {
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
            let data: QuestionPreviewCollections = action.data;
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

        case QuestionActionTypes.BlurrySearchOK:
            return {
                status: ReducerStateStatus.DONE,
                featuredQuestions: action.data,
                myQuestions: state.myQuestions,
                lastUpdated: state.lastUpdated,
                error: ''
            };
        case QuestionActionTypes.PreciseSearchOK:
            return {
                status: ReducerStateStatus.DONE,
                featuredQuestions: action.data,
                myQuestions: state.myQuestions,
                lastUpdated: state.lastUpdated,
                error: ''
            };

        default:
            return state;
    }
};