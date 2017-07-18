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
    static CreateQuestion = "/create-questionHome";
    static QuestionPreviews = "/questionHome-previews";
    static GetQuestionPage = "/questionHome-page/:id";
    static UpdateQuestion = "/update-questionHome";
    
    static CreateAnswer = "/create-answer";
    static UpdateAnswer = "/update-answer";

    static UpVoteAnswer = "/up-vote-answer";
    static UpVoteQuestion = "/up-vote-questionHome";
    static DownVoteAnswer = "/down-vote-answer";
    static DownVoteQuestion = "/down-vote-questionHome";

    /* Utils */
    static getCountries = "/get-countries";
    static getUniversitiesByCountry = "/university/:country"
}
