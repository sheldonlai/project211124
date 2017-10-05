export class APIUrls {

    static MainPage = "/";

    /* Dashboard */
    static FetchDashboard = "/fetch-dashboard";

    /* Common */
    static SearchUsers = "/search-users";

    /* authentication */
    static Login = "/auth/login";
    static Register = "/auth/register";
    static Verify = "/auth/verify/:code";
    static EmailAvailability = "/email-availability/:email";
    static UsernameAvailability = "/username-availability/:username";

    /* upload */
    static Upload = "/upload";
    static PreviewImageUpload = "/upload/preview-image";

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

    static CreateQuestionComment = "/create-question-comment/:id";
    static UpdateQuestionComment = "/update-question-comment/:id";
    static DeleteQuestionComment = "/delete-question-comment/:id";

    static CreateAnswerComment = "/create-answer-comment/:id";
    static UpdateAnswerComment = "/update-answer-comment/:id";
    static DeleteAnswerComment = "/delete-answer-comment/:id";

    static MarkAnswerAsCorrect = "/answer-correct";

    static blurryQuestionSearch = "/blurry-question-search";
    static preciseQuestionSearch = "/precise-question-search";

    /* Utils */
    static getCountries = "/get-countries";
    static getUniversitiesByCountry = "/university/:country";

    /* Profile */
    static updateProfile = "/update-profile";
    static getProfile = "/get-profile/:username";

    /* Rate Your Teammate */
    static createTeammateRecord = "/create-teammate-record";
    static getTeammateRecordPreview = "/get-teammate-previews";
    static getTeammateRecord = "/get-teammate-record/:id";
    static addRating = "/add-teammate-rating/:id";
    static editRating = "/edit-teammate-rating/:id";

    static searchForTeammate = "/search-teammate";
    static BlurryTeammateSearch = "/blurry-teammate-search";
    static PreciseTeammateSearch = "/precise-teammate-search";

    /* Story */
    static getStoryPreviews = "/story-previews";
    static getStory = "/story/:id";
    static createStory = "/create-story";
    static updateStory = "/update-story";
    static createStoryComment = "/create-story-comment/:id";
    static updateStoryComment = "/update-story-comment/:id";
    static UpVoteStory = "/up-vote-story";
    static DownVoteStory = "/down-vote-story";

    /* Recruitment */
    static createRecruitment = "/create-recruitment";
    static fetchRecruitmentPage = "/fetch-recruitment/:id";

    static addRecruitmentComment = "/add-recruitment-comment";

    /* Notification */
    static getNotificationsByUser = "/notifications";
    static notificationSeen = "/notification/seen/:id";
    static deleteNotification = "/notification/delete/:id";

    /* Subscription */
    static subscribe = "/subscription/subscribe";
    static unsubscribe = "/subscription/unsubscribe/:id";
    static getSubscribers = "/subscription/subscribers";
    static getSubscribees = "/subscription/subscribees";
    static getBySubscribeeType = "/subscription/subscribees/:type";
    static getByID = "/subscription/get/:id";

    /* Admin*/
    static SetDashboardSettings = "/set-dashboard-settings";
    static GetDashboardSettings = "/get-dashboard-settings";

    /* Notification */
    static NotificationFetch = "/fetch-notifications";


}
