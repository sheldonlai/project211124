import {QuestionActionTypes} from '../constants/action.types/QuestionActionTypes';
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
import {QuestionDto} from "../../../server/dtos/q&a/QuestionDto";

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
        return function (dispatch) {
            apiController.createQuestion(questionReq).then(res => {
                dispatch({
                    type: QuestionActionTypes.QuestionCreated,
                    data: res.data
                });
                RouterController.history.push(Routes.question_by_id.replace(":id", res.data._id));
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

    static createComment(comment: CommentDto, questionId: string){
        return (dispatch) => {
            apiController.createQuestionComment(comment, questionId).then(res => {
                dispatch({
                    type: QuestionActionTypes.createQuestionComment,
                    data: res.data
                });
            }).catch(err =>
            QuestionActions.handleError(dispatch, err, QuestionActionTypes.createQuestionCommentError)
            )
        }
    }

    static updateComment(comment: CommentDto, questionId: string){
        return (dispatch) => {
            apiController.updateQuestionComment(comment, questionId).then(res => {
                dispatch({
                    type: QuestionActionTypes.UpdateQuestionComment,
                    data: res.data,
                });
            }).catch(err =>
            QuestionActions.handleError(dispatch, err, QuestionActionTypes.UpdateQuestionCommentError)
            )
        }
    }

    static deleteComment(comment: CommentDto, questionId: string){
        return (dispatch) => {
            apiController.deleteQuestionComment(comment, questionId).then(res => {
                dispatch({
                    type: QuestionActionTypes.DeleteQuestionComment,
                    data: res.data,
                })
            }).catch(err =>
                QuestionActions.handleError(dispatch, err, QuestionActionTypes.DeleteQuestionCommentError)
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

    static BlurrySearch(inputStrings: string[]){
        return (dispatch) => {
            apiController.blurryQuestinoSearch(inputStrings).then(res => {
                dispatch({
                    type: QuestionActionTypes.BlurrySearchOK,
                    data: res.data
                })
            }).catch(err =>
                    QuestionActions.handleError(dispatch, err, QuestionActionTypes.BlurrySearchError)
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