/**
 * Created by SHELDON on 6/24/2017.
 */
import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {QuestionActionTypes} from "../constants/action.types/QuestionActionTypes";
import {FrontEndQuestionModels} from "../models/QuestionModels";
import QuestionPage = FrontEndQuestionModels.QuestionPage;
import cloneQuestionPage = FrontEndQuestionModels.cloneQuestionPage;
import Answer = FrontEndQuestionModels.Answer;
import cloneQuestion = FrontEndQuestionModels.cloneQuestion;
import Question = FrontEndQuestionModels.Question;

export interface QuestionPageReducerState {
    status: ReducerStateStatus;    // status of the state
    questionPage: QuestionPage;    // main data of the reducer
    lastUpdated: number;            // date to determine if it should fetch again
    error: string;                  // error message to display
}

const initialState: QuestionPageReducerState = {
    status: ReducerStateStatus.LOADING,
    questionPage: undefined,
    lastUpdated: undefined,
    error: ''
};

const getErrorState = (state: QuestionPageReducerState, action: any) => {
    return {
        status: ReducerStateStatus.ERROR,
        questionPage: state.questionPage,
        lastUpdated: state.lastUpdated,
        error: action.data ? action.data : 'An unexpected error has occurred.'
    };
};

const getOKState = (questionPage: QuestionPage) => {
    return {
        status: ReducerStateStatus.DONE,
        questionPage: questionPage,
        lastUpdated: Date.now(),
        error: ''
    };
};

const getLoadingState = (state: QuestionPageReducerState) => {
    return {
        status: ReducerStateStatus.LOADING,
        questionPage: state.questionPage,
        lastUpdated: state.lastUpdated,
        error: ''
    };
};

const getUpdatedStateForQuestion = ( question : Question, state: QuestionPageReducerState) => {
    state.questionPage = cloneQuestionPage(state.questionPage);
    state.questionPage.question = cloneQuestion(question);
    return getOKState(state.questionPage);
};

const getUpdatedStateForAnswer = (answer : Answer, state: QuestionPageReducerState) => {
    state.questionPage = cloneQuestionPage(state.questionPage);
    state.questionPage.answers = state.questionPage.answers.map(a => a._id == answer._id? answer: a);
    return getOKState(state.questionPage);
};

export const QuestionPageReducer = (state = initialState, action): QuestionPageReducerState => {
    switch (action.type) {

        // Fetch Question Page
        case QuestionActionTypes.FetchQuestionPageRequest:
            return getLoadingState(state);

        case QuestionActionTypes.FetchQuestionPageOK:
            return getOKState(action.data);

        case QuestionActionTypes.FetchQuestionPageError:
            return getErrorState(state, action);

        // Edit Question
        case QuestionActionTypes.EditQuestionRequest:
            return getLoadingState(state);

        case QuestionActionTypes.EditQuestionOK:
            return getUpdatedStateForQuestion(action.data, state);

        case QuestionActionTypes.EditQuestionError:
            return getErrorState(state, action);


        // Comments


        case QuestionActionTypes.createQuestionComment:
            return getUpdatedStateForQuestion(action.data, state);

        case QuestionActionTypes.UpdateQuestionComment:
            return getUpdatedStateForQuestion(action.data, state);

        case QuestionActionTypes.DeleteQuestionComment:
            return getUpdatedStateForQuestion(action.data, state);

        case QuestionActionTypes.createQuestionCommentError:
            return getErrorState(state, action);

        case QuestionActionTypes.UpdateQuestionCommentError:
            return getErrorState(state, action);

        case QuestionActionTypes.DeleteQuestionCommentError:
            return getErrorState(state, action);


        // Up and down votes

        case QuestionActionTypes.UpVoteQuestion:
            return getUpdatedStateForQuestion(action.data, state);

        case QuestionActionTypes.DownVoteQuestion:
            return getUpdatedStateForQuestion(action.data, state);


        // Add Answer
        case QuestionActionTypes.AddAnswerRequest:
            return getLoadingState(state);

        case QuestionActionTypes.AddAnswerOK:
            state.questionPage = cloneQuestionPage(state.questionPage);
            state.questionPage.answers.push(action.data);
            return getOKState(state.questionPage);

        case QuestionActionTypes.AddAnswerError:
            return getErrorState(state, action);


        // Edit Answer
        case QuestionActionTypes.EditAnswerRequest:
            return getLoadingState(state);

        case QuestionActionTypes.EditAnswerOK:
            return getUpdatedStateForAnswer(action.data, state);

        case QuestionActionTypes.EditAnswerError:
            return getErrorState(state, action);


        // Comments
        case QuestionActionTypes.createAnswerComment:
            return getUpdatedStateForAnswer(action.data, state);

        case QuestionActionTypes.UpdateAnswerComment:
            return getUpdatedStateForAnswer(action.data, state);

        case QuestionActionTypes.DeleteAnswerComment:
            return getUpdatedStateForAnswer(action.data, state);


         // up vote answers
        case QuestionActionTypes.UpVoteAnswer:
            return getUpdatedStateForAnswer(action.data, state);

        case QuestionActionTypes.DownVoteAnswer:
            return getUpdatedStateForAnswer(action.data, state);

        default:
            return state;
    }
};