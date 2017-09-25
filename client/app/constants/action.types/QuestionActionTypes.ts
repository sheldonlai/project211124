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

    createQuestionComment = <any> "createQuestionComment",
    createQuestionCommentError = <any> "createQuestionCommentError",
    createAnswerComment = <any> "createAnswerComment",
    createAnswerCommentError = <any> "createAnswerCommentError",

    UpdateQuestionComment = <any> "UpdateQuesitonComment",
    UpdateQuestionCommentError = <any> "UpdateQuestionCommentError",
    UpdateAnswerComment = <any> "UpdateAnswerComment",
    UpdateAnswerCommentError = <any> "UpdateAnswerCommentError",

    DeleteQuestionComment = <any> "DeleteQuestionComment",
    DeleteQuestionCommentError = <any> "DeleteQuestionCommentError",
    DeleteAnswerComment = <any> "DeleteAnswerComment",
    DeleteAnswerCommentError = <any> "DeleteAnswerCommentError",

    UpVoteQuestion = <any> "UpVoteQuestion",
    DownVoteQuestion = <any> "DownVoteQuestion",


    UpVoteAnswer = <any> "UpVoteAnswer",
    DownVoteAnswer = <any> "DownVoteAnswer",

    QuestionPageError = <any> "QuestionPageError",

    QuestionEditorStateChange = <any> "QuestionEditorStateChange",

    MarkAnswerAsCorrectReq = <any> "MarkAnswerAsCorrectReq",
    MarkAnswerAsCorrectOK = <any> "MarkAnswerAsCorrectOK",
    MarkAnswerAsCorrectErr = <any> "MarkAnswerAsCorrectErr",

    BlurrySearchOK = <any> "BlurrySearchOK",
    BlurrySearchError = <any> "BlurrySearchError",

    PreciseSearchOK = <any> "PreciseSearchOK",
    PreciseSearchError = <any> "PreciseSearchError",

    AdvancedSearchOk = <any> "AdvancedSearchOK",
    AdvancedSearchError = <any> "AdvancedSearchError",
}