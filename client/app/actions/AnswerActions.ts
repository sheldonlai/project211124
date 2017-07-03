import {QuestionActionTypes} from '../constants/QuestionActionTypes';
import {QuestionAPIController} from '../api.controllers/QuestionAPIController';
import {BaseActions} from "./BaseActions";
import {AxiosResponse} from "axios";
import {FrontEndQuestionModels} from "../models/QuestionModels";
import Question = FrontEndQuestionModels.Question;
import QuestionPage = FrontEndQuestionModels.QuestionPage;
import Answer = FrontEndQuestionModels.Answer;

let apiController : QuestionAPIController = QuestionAPIController.getInstance();

export class AnswerActions extends BaseActions{

    static createQuestion(questionReq : Question) : (dispatch: any) => void {
        return function(dispatch) {
            apiController.createQuestion(questionReq).then(res => {
                dispatch({
                    type: QuestionActionTypes.QuestionCreated,
                    data: res.data
                })
            }).catch(err =>
                AnswerActions.handleError(dispatch, err, QuestionActionTypes.CreateQuestionError)
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
                AnswerActions.handleError(dispatch, err, QuestionActionTypes.EditAnswerError)
            )
        }
    }

    static createAnswer(answer: Answer): (dispatch: any) => void {
        return function(dispatch) {
            dispatch({
                type: QuestionActionTypes.AddAnswerRequest
            });
            apiController.createAnswer(answer).then((answer) => {
                dispatch({
                    type: QuestionActionTypes.AddAnswerOK,
                    data: answer
                })
            }).catch(err =>
                AnswerActions.handleError(dispatch, err, QuestionActionTypes.AddAnswerError)
            )
        }
    }

    static updateAnswer(answer: Answer): (dispatch: any) => void {
        return function(dispatch) {
            dispatch({
                type: QuestionActionTypes.EditAnswerRequest
            });
            apiController.createAnswer(answer).then((answer) => {
                dispatch({
                    type: QuestionActionTypes.EditAnswerOK,
                    data: answer
                })
            }).catch(err =>
                AnswerActions.handleError(dispatch, err, QuestionActionTypes.EditAnswerError)
            )
        }
    }


}