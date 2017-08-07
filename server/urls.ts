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
    static GetQuestionPage = "/question-page/:id";
    static UpdateQuestion = "/update-question";
    
    static CreateAnswer = "/create-answer";
    static UpdateAnswer = "/update-answer";

    static UpVoteAnswer = "/up-vote-answer";
    static UpVoteQuestion = "/up-vote-question";
    static DownVoteAnswer = "/down-vote-answer";
    static DownVoteQuestion = "/down-vote-question";

    static CreateComment = "/create-comment";
    static UpdateComment = "/update-comment";

    /* Utils */
    static getCountries = "/get-countries";
    static getUniversitiesByCountry = "/university/:country";

    /* Profile */
    static updateProfile="/update-profile";

    /* Rate Your Teammate */
    static createTeammateRecord="/create-teammate-record";
    static getTeammateRecordPreview="/get-teammate-previews";
    static getTeammateRecord="/get-teammate-record/:id";
    static addRating="/add-teammate-rating/:id";
    static editRating="/edit-teammate-rating/:id";

    static searchForTeammate ="/search-teammate";
}
