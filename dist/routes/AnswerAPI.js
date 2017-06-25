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
var AnswerAPI = (function (_super) {
    __extends(AnswerAPI, _super);
    function AnswerAPI(router, service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        router.post(urls_1.APIUrls.CreateAnswer, AuthMiddleware_1.mustBeAuthenticated, _this.CreateAnswer);
        router.post(urls_1.APIUrls.UpdateAnswer, AuthMiddleware_1.mustBeAuthenticated, _this.UpdateAnswer);
        return _this;
    }
    AnswerAPI.prototype.CreateAnswer = function (req, res, next) {
        var answer = req.body;
        var user = req.user;
        var result = this.service.createAnswer(user, answer);
        this.respondPromise(result, res, next);
    };
    AnswerAPI.prototype.UpdateAnswer = function (req, res, next) {
        var answer = req.body;
        var user = req.user;
        var result = this.service.updateAnswer(user, answer);
        this.respondPromise(result, res, next);
    };
    return AnswerAPI;
}(BaseAPI_1.BaseAPI));
exports.AnswerAPI = AnswerAPI;
//# sourceMappingURL=AnswerAPI.js.map