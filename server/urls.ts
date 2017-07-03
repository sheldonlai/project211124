export class APIUrls {

    static MainPage = "/";

    /* Common */
    static SearchUsers = "/search-users";

    /* authentication */
    static Login = "/auth/login";
    static Register = "/auth/register";
    static Verify = "/auth/verify/:code";

    /* upload */
    static Upload = "/upload";

    /* Question & Answer */
    static CreateQuestion = "/create-question";
    static QuestionPreviews = "/question-previews";
    static GetQuestionPage = "/question-page/:title";
    static UpdateQuestion = "/update-question";
    
    static CreateAnswer = "/create-answer";
    static UpdateAnswer = "/update-answer";
}
