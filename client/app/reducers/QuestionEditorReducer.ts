import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {QuestionActionTypes} from "../constants/action.types/QuestionActionTypes";
import {FrontEndQuestionModels} from "../models/QuestionModels";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;
import QuestionPreviewCollections = FrontEndQuestionModels.QuestionPreviewCollections;
import Question = FrontEndQuestionModels.Question;
import cloneQuestion = FrontEndQuestionModels.cloneQuestion;

export interface QuestionEditorReducerState {
    edit: boolean;
    question: Question;
}

const initialState : QuestionEditorReducerState = {
    edit: false,
    question: undefined
};

export const QuestionEditorReducer = (state = initialState, action) : QuestionEditorReducerState => {
    switch (action.type) {
        case QuestionActionTypes.FetchQuestionPageOK:
            return {
                edit: false,
                question: cloneQuestion(action.data.question)
            };

        case QuestionActionTypes.EditQuestionOK:
            return {
                edit: false,
                question: cloneQuestion(action.data)
            };

        case QuestionActionTypes.UpVoteQuestion:
            let question = cloneQuestion(action.data);
            state.question.upVotes = question.upVotes;
            state.question.downVotes = question.downVotes;
            return state;

        case QuestionActionTypes.DownVoteQuestion:
            question = cloneQuestion(action.data);
            state.question.upVotes = question.upVotes;
            state.question.downVotes = question.downVotes;
            return state;

        case QuestionActionTypes.QuestionEditorStateChange:
            return action.data;
        default:
            return state;
    }
};