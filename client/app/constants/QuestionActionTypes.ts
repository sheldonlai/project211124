/**
 * Created by SHELDON on 6/1/2017.
 */
export enum QuestionActionTypes {
    QuestionPreviewsRequest = <any> "QuestionPreviewsError",
    QuestionPreviewsError = <any> "QuestionPreviewsError",
    QuestionPreviewsOK = <any> "QuestionPreviewsOK",

    CreateQuestionRequest = <any> "CreateQuestionRequest",
    CreateQuestionError = <any> "CreateQuestionError",
    QuestionCreated = <any> "QuestionCreated",

    FetchQuestionRequest = <any> "FetchQuestionRequest",
    FetchQuestionError = <any> "FetchQuestionError",
    FetchedQuestion = <any> "FetchedQuestion",
}