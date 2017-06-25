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
var Question_1 = require("../models/Question");
var BaseRepository_1 = require("./BaseRepository");
var QuestionRepository = (function (_super) {
    __extends(QuestionRepository, _super);
    function QuestionRepository() {
        return _super.call(this, Question_1.QuestionModel) || this;
    }
    QuestionRepository.prototype.create = function (question) {
        delete question.lastEditedUtc;
        return _super.prototype.create.call(this, question);
    };
    QuestionRepository.prototype.update = function (question) {
        delete question.lastEditedUtc;
        return _super.prototype.update.call(this, question);
    };
    QuestionRepository.prototype.getQuestionByAuthor = function (user) {
        return Question_1.QuestionModel.find({ author: user })
            .lean().exec().then(function (question) {
            return this.getModels(question);
        });
    };
    return QuestionRepository;
}(BaseRepository_1.BaseRepository));
exports.QuestionRepository = QuestionRepository;
//# sourceMappingURL=QuestionRepository.js.map