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
var mongoose_1 = require("mongoose");
var BaseModel_1 = require("./BaseModel");
var PublicityStatus_1 = require("../enums/PublicityStatus");
var QuestionEducationLevel_1 = require("../enums/QuestionEducationLevel");
var EnumsUtil_1 = require("../utils/EnumsUtil");
var QuestionComment = (function () {
    function QuestionComment(user, content) {
        this.commentBy = user;
        this.commentContent = content;
    }
    return QuestionComment;
}());
exports.QuestionComment = QuestionComment;
var Question = (function (_super) {
    __extends(Question, _super);
    function Question(title, content, author, tags, isPublished, publicityStatus, difficulty) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.content = content;
        _this.author = author;
        _this.tags = tags;
        _this.isPublished = isPublished ? isPublished : false;
        _this.publicityStatus = publicityStatus ? publicityStatus : PublicityStatus_1.PublicityStatus.PUBLIC;
        _this.difficulty = difficulty;
        return _this;
    }
    return Question;
}(BaseModel_1.BaseModel));
exports.Question = Question;
var schema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    tags: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'tag' }],
    isPublished: { type: Boolean, default: false },
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
    resolved: { type: Boolean, default: false },
    lastEditedUtc: { type: Date, default: Date.now },
    createdUtc: { type: Date, default: Date.now },
    publicityStatus: {
        type: String,
        enum: Object.keys(PublicityStatus_1.PublicityStatus)
    },
    difficulty: {
        educationLevel: {
            type: String,
            enum: Object.keys(QuestionEducationLevel_1.QuestionEducationLevel),
            default: QuestionEducationLevel_1.QuestionEducationLevel.NOT_SPECIFIED
        },
        difficultyLevel: {
            type: Number,
            enum: EnumsUtil_1.listNumericalEnumValues(QuestionEducationLevel_1.DifficultyLevel),
            default: QuestionEducationLevel_1.DifficultyLevel.NOT_SPECIFIED
        }
    },
    uploads: [
        { fileUrl: String }
    ],
    comments: [{
            commentBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
            commentContent: { type: String, required: true },
            lastEditedUtc: { type: Date, default: Date.now }
        }]
});
exports.QuestionModel = mongoose_1.model('question', schema);
//# sourceMappingURL=Question.js.map