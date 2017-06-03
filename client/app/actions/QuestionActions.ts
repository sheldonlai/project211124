import AppDispatcher from '../dispatcher/AppDispatcher';
import {QuestionActionTypes} from './QuestionActionTypes';
import {QuestionAPIController} from '../api.controllers/QuestionAPIController';
import {QuestionDto} from '../../../common/dtos/q&a/QuestionDto';

let apiController : QuestionAPIController = QuestionAPIController.getInstance();

export class QuestionActions {

    static getQuestionPreviews() {
        apiController.fetchQuestionPreviews().then(()=> {
            AppDispatcher.dispatch({
                type : QuestionActionTypes.FetchedQuestionPreviews
            })
        }).catch(err => {
            AppDispatcher.dispatch({
                type: QuestionActionTypes.QuestionCreated,
                data: err.response.data
            })
        })

    }

    static createQuestion(questionReq : QuestionDto){
        apiController.createQuestion(questionReq).then(res => {
            AppDispatcher.dispatch({
                type: QuestionActionTypes.QuestionCreated,
                data: res.data
            })
        }).catch(err => {
            AppDispatcher.dispatch({
                type: QuestionActionTypes.QuestionCreated,
                data: err.response.data
            })
        })
    }


}