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
var Answer_1 = require("../models/Answer");
var BaseRepository_1 = require("./BaseRepository");
var AnswerRepository = (function (_super) {
    __extends(AnswerRepository, _super);
    function AnswerRepository() {
        return _super.call(this, Answer_1.AnswerModel) || this;
    }
    AnswerRepository.prototype.getByQuestionId = function (questionId, sort) {
        var sortOption = sort ? sort : '-createdUtc';
        return Answer_1.AnswerModel.find({ question: questionId }).sort(sortOption).lean().exec();
    };
    AnswerRepository.prototype.create = function (answer) {
        delete answer.lastEditedUtc;
        return _super.prototype.create.call(this, answer);
    };
    AnswerRepository.prototype.update = function (answer) {
        delete answer.lastEditedUtc;
        return _super.prototype.update.call(this, answer);
    };
    return AnswerRepository;
}(BaseRepository_1.BaseRepository));
exports.AnswerRepository = AnswerRepository;
//# sourceMappingURL=AnswerRepository.js.map