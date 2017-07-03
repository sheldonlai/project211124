
import {QuestionActionTypes} from '../constants/QuestionActionTypes';
import {QuestionAPIController} from '../api.controllers/QuestionAPIController';
import {BaseActions} from "./BaseActions";
import {AxiosResponse} from "axios";
import {FrontEndQuestionModels} from "../models/QuestionModels";
import Question = FrontEndQuestionModels.Question;
import QuestionPage = FrontEndQuestionModels.QuestionPage;

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
            });
        }
    }

    static createQuestion(questionReq : Question) : (dispatch: any) => void {
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

    static updateQuestion(questionReq : Question) : (dispatch: any) => void {
        return function(dispatch) {
            apiController.createQuestion(questionReq).then(res => {
                dispatch({
                    type: QuestionActionTypes.EditAnswerOK,
                    data: res.data
                })
            }).catch(err =>
                QuestionActions.handleError(dispatch, err, QuestionActionTypes.EditAnswerError)
            )
        }
    }

    static fetchQuestionPage(name: string){
        return function(dispatch) {
            dispatch({
                type: QuestionActionTypes.FetchQuestionPageRequest
            });
            apiController.fetchQuestionByTitle(name).then(res => {
                dispatch({
                    type: QuestionActionTypes.FetchQuestionPageOK,
                    data: res.data
                })
            }).catch(err =>
                QuestionActions.handleError(dispatch, err, QuestionActionTypes.FetchQuestionPageError)
            )
        }
    }


    static changeQuestionPage(question: QuestionPage){
        return {
            type: QuestionActionTypes.ChangePostPage,
            data: question
        }
    }


}