
import {QuestionActionTypes} from '../constants/QuestionActionTypes';
import {QuestionAPIController} from '../api.controllers/QuestionAPIController';
import {QuestionDto} from "../../../server/dtos/q&a/QuestionDto";
import {BaseActions} from "./BaseActions";
import {AxiosResponse} from "axios";

let apiController : QuestionAPIController = QuestionAPIController.getInstance();

export class QuestionActions extends BaseActions{

    static getQuestionPreviews() : (dispatch: any) => void {
        return function(dispatch){
            apiController.fetchQuestionPreviews().then((res : AxiosResponse)=> {
                dispatch({
                    type : QuestionActionTypes.QuestionPreviewsOK,
                    data : res.data
                })
            }).catch(err => {
                QuestionActions.handleError(dispatch, err, QuestionActionTypes.QuestionPreviewsError)
            })
        }
    }

    static createQuestion(questionReq : QuestionDto) : (dispatch: any) => void {
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