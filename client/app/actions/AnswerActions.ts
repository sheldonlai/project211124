import {QuestionActionTypes} from "../constants/QuestionActionTypes";
import {QuestionAPIController} from "../api.controllers/QuestionAPIController";
import {BaseActions} from "./BaseActions";
import {FrontEndQuestionModels} from "../models/QuestionModels";
import Question = FrontEndQuestionModels.Question;
import QuestionPage = FrontEndQuestionModels.QuestionPage;
import Answer = FrontEndQuestionModels.Answer;

let apiController : QuestionAPIController = QuestionAPIController.getInstance();

export class AnswerActions extends BaseActions{

    static createAnswer(answer: Answer): (dispatch: any) => void {
        return function(dispatch) {
            dispatch({
                type: QuestionActionTypes.AddAnswerRequest
            });
            apiController.createAnswer(answer).then((response) => {
                dispatch({
                    type: QuestionActionTypes.AddAnswerOK,
                    data: response.data
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
            apiController.updateAnswer(answer).then((response) => {
                dispatch({
                    type: QuestionActionTypes.EditAnswerOK,
                    data: response.data
                })
            }).catch(err =>
                AnswerActions.handleError(dispatch, err, QuestionActionTypes.EditAnswerError)
            )
        }
    }

    static upVoteAnswer (answer: Answer): (dispatch: any) => void {
        return function(dispatch) {
            apiController.updateAnswer(answer).then((response) => {
                dispatch({
                    type: QuestionActionTypes.UpVoteAnswer,
                    data: response.data
                })
            }).catch(err =>
                AnswerActions.handleError(dispatch, err, QuestionActionTypes.QuestionPageError)
            )
        }
    }

    static downVoteAnswer (answer: Answer): (dispatch: any) => void {
        return function(dispatch) {
            apiController.updateAnswer(answer).then((response) => {
                dispatch({
                    type: QuestionActionTypes.DownVoteAnswer,
                    data: response.data
                })
            }).catch(err =>
                AnswerActions.handleError(dispatch, err, QuestionActionTypes.QuestionPageError)
            )
        }
    }
}