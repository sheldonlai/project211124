import AppDispatcher from '../dispatcher/AppDispatcher';
import {QuestionActionTypes} from './QuestionActionTypes';
/**
 * Created by SHELDON on 6/1/2017.
 */

export class QuestionActions {
    static getQuestionPreviews() {
        AppDispatcher.dispatch({
            type : QuestionActionTypes.FetchQuestionPreviews
        })
    }

    static createQuestion(questionReq : any){
        AppDispatcher.dispatch({
            type: QuestionActionTypes.CreateQuestion,
            data: questionReq
        })
    }


}