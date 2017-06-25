"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var APIUrls = (function () {
    function APIUrls() {
    }
    return APIUrls;
}());
APIUrls.MainPage = "/";
/* Common */
APIUrls.SearchUsers = "/search-users";
/* authentication */
APIUrls.Login = "/auth/login";
APIUrls.Register = "/auth/register";
/* Question & Answer */
APIUrls.CreateQuestion = "/create-question";
APIUrls.QuestionPreviews = "/question-previews";
APIUrls.GetQuestionPage = "/question-page/:id";
APIUrls.UpdateQuestion = "/update-question";
APIUrls.CreateAnswer = "/create-answer";
// Answer preview ?
APIUrls.UpdateAnswer = "/update-answer";
exports.APIUrls = APIUrls;
//# sourceMappingURL=urls.js.map