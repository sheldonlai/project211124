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
var Answer = (function (_super) {
    __extends(Answer, _super);
    function Answer(question, content, author, comments) {
        var _this = _super.call(this) || this;
        _this.question = question;
        _this.content = content;
        _this.author = author;
        _this.comments = (comments == null) ? [] : comments;
        return _this;
    }
    return Answer;
}(BaseModel_1.BaseModel));
exports.Answer = Answer;
;
var schema = new mongoose_1.Schema({
    question: { type: mongoose_1.Schema.Types.ObjectId, ref: 'question', required: true },
    content: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
    lastEditedUtc: { type: Date, default: Date.now },
    createdUtc: { type: Date, default: Date.now },
    comments: [{
            commentBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
            commentContent: { type: String, required: true },
            lastEditedUtc: { type: Date, default: Date.now }
        }]
});
exports.AnswerModel = mongoose_1.model('answer', schema);
//# sourceMappingURL=Answer.js.map