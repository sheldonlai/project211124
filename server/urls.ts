export class APIUrls {

    static MainPage = "/";

    /* Common */
    static SearchUsers = "/search-users";

    /* authentication */
    static Login = "/auth/login";
    static Register= "/auth/register";

    /* Question & Answer */
    static CreateQuestion = "/create-question";
    static QuestionPreviews = "/question-previews";
    static GetQuestionPage = "/question-page/:id";
    static UpdateQuestion = "/update-question";
    
    static CreateAnswer = "/create-answer";
    // Answer preview ?
    static UpdateAnswer = "/update-answer";
}
