import AppDispatcher from '../dispatcher/AppDispatcher';
import {CommonController} from '../api.controllers/CommonController';
import {QuestionPreview} from '../models/quetsions/QuestionPreview';
import {QuestionPageDto} from '../../../common/dtos/q&a/QuestionPageDto';
import {ReduceStore} from 'flux/utils';
import {QuestionActionTypes} from '../actions/QuestionActionTypes';


export interface QuestionState {
    questionPreviews : QuestionPreview[];
    questionPage : QuestionPageDto;

}

class QuestionStoreClass extends ReduceStore<QuestionState, any> {

    commonController : CommonController;

    constructor(){
        super(AppDispatcher);
        this.commonController = CommonController.getInstance();
    }

    getInitialState() : QuestionState {
        return {
            questionPreviews : [],
            questionPage : null
        };
    }

    reduce(state: any, action: any) {
        switch (action.type) {
            case QuestionActionTypes.CreateQuestion:

                return state;
            case QuestionActionTypes.FetchQuestionPreviews:

                return state;

            case QuestionActionTypes.FetchedQuestionPreviews:
                return state;

            case QuestionActionTypes.QuestionCreated:
                return state;
            default:
                return state;
        }
    }
}

export default new QuestionStoreClass();
