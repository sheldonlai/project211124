import AppDispatcher from '../dispatcher/AppDispatcher';
import {CommonController} from '../api.controllers/CommonController';
import {QuestionPageDto} from '../../../common/dtos/q&a/QuestionPageDto';
import {ReduceStore} from 'flux/utils';
import {QuestionActionTypes} from '../actions/QuestionActionTypes';
import {QuestionPreview} from '../../../common/dtos/q&a/QuestionPreview';


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
            case QuestionActionTypes.CreateQuestionError:

                return state;

            case QuestionActionTypes.FetchedQuestionPreviews:

                return state;

            case QuestionActionTypes.FetchedQuestion:
                let data : QuestionPageDto = action.data;

                return state;

            case QuestionActionTypes.QuestionCreated:
                return state;
            default:
                return state;
        }
    }
}

export default new QuestionStoreClass();
