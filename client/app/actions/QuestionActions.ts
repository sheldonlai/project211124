
import {QuestionActionTypes} from './QuestionActionTypes';
import {QuestionAPIController} from '../api.controllers/QuestionAPIController';
import {QuestionDto} from '../../../common/dtos/q&a/QuestionDto';

let apiController : QuestionAPIController = QuestionAPIController.getInstance();

export class QuestionActions {

    static getQuestionPreviews() {
        return function(dispatch){
            apiController.fetchQuestionPreviews().then(()=> {
                dispatch({
                    // type : QuestionActionTypes.FetchedQuestionPreviews
                })
            }).catch(err => {
                dispatch({
                    // type: QuestionActionTypes.QuestionCreated,
                    data: err.response.data
                })
            })
        }
    }

    static createQuestion(questionReq : QuestionDto){
        return function(dispatch) {
            apiController.createQuestion(questionReq).then(res => {
                dispatch({
                    type: QuestionActionTypes.QuestionCreated,
                    data: res.data
                })
            }).catch(err => {
                dispatch({
                    type: QuestionActionTypes.QuestionCreated,
                    data: err.response.data
                })
            })
        }
    }


}