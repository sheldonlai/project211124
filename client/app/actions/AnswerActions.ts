import {QuestionActionTypes} from "../constants/action.types/QuestionActionTypes";
import {QuestionAPIController} from "../api.controllers/QuestionAPIController";
import {BaseActions} from "./BaseActions";
import {FrontEndQuestionModels} from "../models/QuestionModels";
import Question = FrontEndQuestionModels.Question;
import QuestionPage = FrontEndQuestionModels.QuestionPage;
import Answer = FrontEndQuestionModels.Answer;
import {CommentDto} from "../../../server/dtos/q&a/CommentDto";

let apiController: QuestionAPIController = QuestionAPIController.getInstance();

export class AnswerActions extends BaseActions {

    static createAnswer(answer: Answer): (dispatch: any) => void {
        return function (dispatch) {
            dispatch({
                type: QuestionActionTypes.AddAnswerRequest
            });
            apiController.createAnswer(answer).then((response) => {
                dispatch({
                    type: QuestionActionTypes.AddAnswerOK,
                    data: response.data
                });
            }).catch(err =>
                AnswerActions.handleError(dispatch, err, QuestionActionTypes.AddAnswerError)
            )
        }
    }

    static updateAnswer(answer: Answer): (dispatch: any) => void {
        return function (dispatch) {
            dispatch({
                type: QuestionActionTypes.EditAnswerRequest
            });
            apiController.updateAnswer(answer).then((response) => {
                dispatch({
                    type: QuestionActionTypes.EditAnswerOK,
                    data: response.data
                });
            }).catch(err =>
                AnswerActions.handleError(dispatch, err, QuestionActionTypes.EditAnswerError)
            )
        }
    }

    static markAnswerAsCorrect(answer: Answer): any {
        return function (dispatch){
            dispatch({
                type: QuestionActionTypes.MarkAnswerAsCorrectReq
            })
            apiController.markAnswerAsCorrect(answer).then((res) => {
                dispatch({data: res.data, type: QuestionActionTypes.MarkAnswerAsCorrectOK });
            }).catch((err) => AnswerActions.handleError(dispatch, QuestionActionTypes.MarkAnswerAsCorrectErr))
        }
    }

    static upVoteAnswer(answer: Answer): (dispatch: any) => void {
        return function (dispatch) {
            apiController.upVoteAnswer(answer).then((response) => {
                dispatch({
                    type: QuestionActionTypes.UpVoteAnswer,
                    data: response.data
                });
            }).catch(err =>
                AnswerActions.handleError(dispatch, err, QuestionActionTypes.QuestionPageError)
            )
        }
    }

    static downVoteAnswer(answer: Answer): (dispatch: any) => void {
        return function (dispatch) {
            apiController.downVoteAnswer(answer).then((response) => {
                dispatch({
                    type: QuestionActionTypes.DownVoteAnswer,
                    data: response.data
                });
            }).catch(err =>
                AnswerActions.handleError(dispatch, err, QuestionActionTypes.QuestionPageError)
            )
        }
    }

    static createComment(comment: CommentDto, answerId: string): (dispatch: any) => void {
        return function (dispatch) {
            apiController.createAnswerComment(comment, answerId).then((response) => {
                dispatch({
                    type: QuestionActionTypes.createAnswerComment,
                    data: response.data,
                });
            }).catch(err =>
                AnswerActions.handleError(dispatch, err, QuestionActionTypes.createAnswerCommentError)
            )
        }
    }

    static updateComment(comment: CommentDto, answerId: string): (dispatch: any) => void {
        return function (dispatch) {
            apiController.updateAnswerComment(comment, answerId).then((response) => {
                dispatch({
                    type: QuestionActionTypes.UpdateAnswerComment,
                    data: response.data,
                });
            }).catch(err =>
                AnswerActions.handleError(dispatch, err, QuestionActionTypes.UpdateAnswerCommentError)
            )
        }
    }

    static deleteComment(comment: CommentDto, answerId: string): (dispatch: any) => void {
        return function (dispatch) {
            apiController.DeleteAnswerComment(comment, answerId).then((response) => {
                dispatch({
                    type: QuestionActionTypes.DeleteAnswerComment,
                    data: response.data
                });
            }).catch(err =>
                AnswerActions.handleError(dispatch, err, QuestionActionTypes.DeleteAnswerCommentError)
            )
        }
    }


}