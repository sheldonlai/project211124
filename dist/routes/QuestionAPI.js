"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = require("./BaseAPI");
var urls_1 = require("../urls");
var AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
var QuestionAPI = (function (_super) {
    __extends(QuestionAPI, _super);
    function QuestionAPI(router, service) {
        var _this = _super.call(this) || this;
        _this.getQuestionPreviews = function (req, res, next) {
            var result = _this.service.getQuestionPreview(req.user);
            _this.respondPromise(result, res, next);
        };
        _this.createQuestion = function (req, res, next) {
            var question = req.body;
            var user = req.user;
            var result = _this.service.createQuestion(question, user);
            _this.respondPromise(result, res, next);
        };
        _this.getQuestion = function (req, res, next) {
            var id = req.params.id;
            var result = _this.service.getQuestionPageById(id);
            _this.respondPromise(result, res, next);
        };
        _this.updateQuestion = function (req, res, next) {
            var question = req.body;
            var user = req.user;
            var result = _this.service.updateQuestion(question, user);
            _this.respondPromise(result, res, next);
        };
        _this.service = service;
        router.get(urls_1.APIUrls.QuestionPreviews, AuthMiddleware_1.maybeAuthenticated, _this.getQuestionPreviews);
        router.post(urls_1.APIUrls.CreateQuestion, AuthMiddleware_1.mustBeAuthenticated, _this.createQuestion);
        router.get(urls_1.APIUrls.GetQuestionPage, AuthMiddleware_1.maybeAuthenticated, _this.getQuestion);
        router.put(urls_1.APIUrls.UpdateQuestion, AuthMiddleware_1.mustBeAuthenticated, _this.updateQuestion);
        return _this;
    }
    return QuestionAPI;
}(BaseAPI_1.BaseAPI));
exports.QuestionAPI = QuestionAPI;
//# sourceMappingURL=QuestionAPI.js.map