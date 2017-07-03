import {QuestionActionTypes} from '../constants/QuestionActionTypes';
import {QuestionAPIController} from '../api.controllers/QuestionAPIController';
import {BaseActions} from "./BaseActions";
import {AxiosResponse} from "axios";
import {FrontEndQuestionModels} from "../models/QuestionModels";
import Question = FrontEndQuestionModels.Question;
import QuestionPage = FrontEndQuestionModels.QuestionPage;

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
                })
            }).catch(err =>
                QuestionActions.handleError(dispatch, err, QuestionActionTypes.CreateQuestionError)
            )
        }
    }

    static updateQuestion(question: Question): any {
        // return function(dispatch) {
        //     apiController.createQuestion(questionReq).then(res => {
        //         dispatch({
        //             type: QuestionActionTypes.EditAnswerOK,
        //             data: res.data
        //         })
        //     }).catch(err =>
        //         QuestionActions.handleError(dispatch, err, QuestionActionTypes.EditAnswerError)
        //     )
        // }
        return {
            type: QuestionActionTypes.EditAnswerOK,
            data: question
        };
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
                })
            }).catch(err =>
                QuestionActions.handleError(dispatch, err, QuestionActionTypes.FetchQuestionPageError)
            )
        }
    }

}