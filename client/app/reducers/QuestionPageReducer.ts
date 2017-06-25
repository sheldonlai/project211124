/**
 * Created by SHELDON on 6/24/2017.
 */
import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {QuestionPreview} from "../../../server/dtos/q&a/QuestionPreview";
import {QuestionPreviewDto} from "../../../server/dtos/q&a/QuestionPreviewDto";
import {QuestionActionTypes} from "../constants/QuestionActionTypes";
import {QuestionPageDto} from "../../../server/dtos/q&a/QuestionPageDto";

export interface QuestionPageReducerState {
    status : ReducerStateStatus;
    questionPage : QuestionPageDto;
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
                questionPage : undefined,
                lastUpdated: Date.now(),
                error : action.data
            };
        case QuestionActionTypes.ChangePostPage:
            return {
                status : ReducerStateStatus.ERROR,
                questionPage : action.data,
                lastUpdated: Date.now(),
                error : ''
            }
        default:
            return state;
    }
};