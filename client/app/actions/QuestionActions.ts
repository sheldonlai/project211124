
import {QuestionActionTypes} from '../constants/QuestionActionTypes';
import {QuestionAPIController} from '../api.controllers/QuestionAPIController';
import {QuestionDto} from "../../../server/dtos/q&a/QuestionDto";
import {BaseActions} from "./BaseActions";

let apiController : QuestionAPIController = QuestionAPIController.getInstance();

export class QuestionActions extends BaseActions{

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
            }).catch(err =>
                QuestionActions.handleError(dispatch, err, QuestionActionTypes.CreateQuestionError)
            )
        }
    }


}