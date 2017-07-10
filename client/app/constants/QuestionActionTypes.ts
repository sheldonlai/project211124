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

    FetchQuestionPageRequest = <any> "FetchQuestionPageRequest",
    FetchQuestionPageOK = <any> "FetchQuestionPageOK",
    FetchQuestionPageError = <any> "FetchQuestionPageError",

    EditQuestionRequest = <any> "EditQuestionRequest",
    EditQuestionOK = <any> "EditQuestionOK",
    EditQuestionError = <any> "EditQuestionError",

    AddAnswerRequest = <any> "AddAnswerRequest",
    AddAnswerOK = <any> "AddAnswerOK",
    AddAnswerError = <any> "AddAnswerError",

    EditAnswerRequest = <any> "EditAnswerRequest",
    EditAnswerOK = <any> "EditAnswerOK",
    EditAnswerError = <any> "EditAnswerError",

    ChangePostPage = <any> "ChangePostPage",

    UpVoteQuestion = <any> "UpVoteQuestion",
    DownVoteQuestion = <any> "DownVoteQuestion",


    UpVoteAnswer = <any> "UpVoteAnswer",
    DownVoteAnswer = <any> "DownVoteAnswer",


    QuestionPageError = <any> "QuestionPageError",


}