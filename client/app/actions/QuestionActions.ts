import {QuestionActionTypes} from '../constants/QuestionActionTypes';
import {QuestionAPIController} from '../api.controllers/QuestionAPIController';
import {BaseActions} from "./BaseActions";
import {AxiosResponse} from "axios";
import {FrontEndQuestionModels} from "../models/QuestionModels";
import Question = FrontEndQuestionModels.Question;
import QuestionPage = FrontEndQuestionModels.QuestionPage;
import {QuestionEditorReducerState} from "../reducers/QuestionEditorReducer";
import {RouterController} from "../api.controllers/RouterController";
import {Routes} from "../constants/Routes";
import {CommentDto} from "../../../server/dtos/q&a/CommentDto";

let apiController: QuestionAPIController = QuestionAPIController.getInstance();

export class QuestionActions extends BaseActions {

    static getQuestionPreviews(): (dispatch: any) => void {
        return function (dispatch) {
            apiController.fetchQuestionPreviews().then((res: AxiosResponse) => {
                dispatch({
                    type: QuestionActionTypes.QuestionPreviewsOK,
                    data: res.data
                })
            }).catch(err => {
                QuestionActions.handleError(dispatch, err, QuestionActionTypes.QuestionPreviewsError)
            });
        }
    }

    static createQuestion(questionReq: Question): (dispatch: any) => void {
        console.log('was here');
        return function (dispatch) {
            apiController.createQuestion(questionReq).then(res => {
                dispatch({
                    type: QuestionActionTypes.QuestionCreated,
                    data: res.data
                });
                RouterController.history.push(Routes.question);
            }).catch(err =>
                QuestionActions.handleError(dispatch, err, QuestionActionTypes.CreateQuestionError)
            )
        }
    }

    static updateQuestion(question: Question): any {
        return function(dispatch) {
            dispatch({
                type: QuestionActionTypes.EditQuestionRequest,
            });
            apiController.updateQuestion(question).then(res => {
                dispatch({
                    type: QuestionActionTypes.EditQuestionOK,
                    data: res.data
                });
            }).catch(err =>
                QuestionActions.handleError(dispatch, err, QuestionActionTypes.EditQuestionError)
            )
        }
    }

    static fetchQuestionPage(id: string) {
        return function (dispatch) {
            dispatch({
                type: QuestionActionTypes.FetchQuestionPageRequest
            });
            apiController.fetchQuestionByID(id).then(res => {
                dispatch({
                    type: QuestionActionTypes.FetchQuestionPageOK,
                    data: res.data
                });
            }).catch(err =>
                QuestionActions.handleError(dispatch, err, QuestionActionTypes.FetchQuestionPageError)
            )
        }
    }

    static createComment(question: Question){
        return (dispatch) => {
            apiController.createComment(question).then(res => {
                dispatch({
                    type: QuestionActionTypes.createComment,
                    data: res.data
                });
            }).catch(err =>
            QuestionActions.handleError(dispatch, err, QuestionActionTypes.createCommentError)
            )
        }
    }

    static updateComment(question: Question, commentIndx: number, updatedComment: CommentDto){
        return (dispatch) => {
            apiController.UpdateComment(question, commentIndx, updatedComment).then(res => {
                dispatch({
                    type: QuestionActionTypes.UpdateComment,
                    data: res.data,
                });
            }).catch(err =>
            QuestionActions.handleError(dispatch, err, QuestionActionTypes.UpdateCommentError)
            )
        }
    }

    static deleteComment(question: Question, commentIndx: number){
        return (dispatch) => {
            apiController.DelteComment(question, commentIndx).then(res => {
                dispatch({
                    type: QuestionActionTypes.DeleteComment,
                    data: res.data,
                })
            }).catch(err =>
                QuestionActions.handleError(dispatch, err, QuestionActionTypes.DeleteCommentError)
            )
        }
    }

    static upVoteQuestion(question: Question) {
        return (dispatch) => {
            apiController.upVoteQuestion(question).then(res => {
                dispatch({
                    type: QuestionActionTypes.UpVoteQuestion,
                    data: res.data
                });
            }).catch(err =>
                QuestionActions.handleError(dispatch, err, QuestionActionTypes.QuestionPageError)
            )
        }
    }

    static downVoteQuestion(question: Question) {
        return (dispatch) => {
            apiController.downVoteQuestion(question).then(res => {
                dispatch({
                    type: QuestionActionTypes.DownVoteQuestion,
                    data: res.data
                });
            }).catch(err =>
                QuestionActions.handleError(dispatch, err, QuestionActionTypes.QuestionPageError)
            )
        }
    }

    static changeQuestionEditorState(state: QuestionEditorReducerState) {
        return {
            type: QuestionActionTypes.QuestionEditorStateChange,
            data: state
        };
    }

}