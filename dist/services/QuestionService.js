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
var Answer_1 = require("../models/Answer");
var AppError_1 = require("../errors/AppError");
var BaseService_1 = require("./BaseService");
var AnswerService = (function (_super) {
    __extends(AnswerService, _super);
    function AnswerService(answerRepository) {
        var _this = _super.call(this) || this;
        _this.checkPermissionForModification = function (answer_by_user, answer_found_in_db, currentUser) {
            if (answer_by_user._id != currentUser._id) {
                throw new AppError_1.AppError("You are not the owner of this answer");
            }
            return true;
        };
        _this.answerRepository = answerRepository;
        return _this;
    }
    AnswerService.prototype.createAnswer = function (current_user, new_answer) {
        var answerObj = new Answer_1.Answer(new_answer.question, new_answer.content, current_user);
        return this.answerRepository.create(answerObj);
    };
    AnswerService.prototype.updateAnswer = function (current_user, updated_answer) {
        var _this = this;
        return this.answerRepository.getById(updated_answer._id).then(function (answer_found) {
            _this.checkPermissionForModification(updated_answer, answer_found, current_user);
            //filter out non-modifiable fields
            delete updated_answer.author;
            delete updated_answer.upVotes;
            delete updated_answer.downVotes;
            delete updated_answer.createdUtc;
            delete updated_answer.question;
            delete updated_answer.comments;
            updated_answer.lastEditedUtc = new Date(Date.now());
            answer_found = _this.mapKeysOntoObject(answer_found, updated_answer);
            return _this.answerRepository.update(answer_found);
        });
    };
    return AnswerService;
}(BaseService_1.BaseService));
exports.AnswerService = AnswerService;
;
;
var QuestionService = (function (_super) {
    __extends(QuestionService, _super);
    function QuestionService(questionRepository, answerRepository) {
        var _this = _super.call(this) || this;
        _this.checkPermissionForModification = function (questionDto, questionObj, currentUser) {
            if (questionObj.author != currentUser._id) {
                throw new AppError_1.AppError("You are not the owner of this question!");
            }
            if (currentUser.name != questionDto.author) {
                throw new AppError_1.AppError("You cannot change the name of the author");
            }
            return true;
        };
        _this.questionRepository = questionRepository;
        _this.answerRepository = answerRepository;
        return _this;
    }
    QuestionService.prototype.getQuestionPreview = function (user) {
        var promises = [];
        promises.push(this.questionRepository.getAll({ sort: "-dateCreated", limit: 25 }));
        if (user) {
            promises.push((this.questionRepository.getQuestionByAuthor(user)));
        }
        return Promise.all(promises).then(function (result) {
            return {
                featuredQuestions: result[0] ? result[0] : [],
                myQuestions: result[1] ? result[1] : []
            };
        });
    };
    QuestionService.prototype.createQuestion = function (question, currentUser) {
        var questionObject = new Question_1.Question(question.title, question.content, currentUser, question.tags, question.isPublished, question.publicityStatus);
        return this.questionRepository.create(questionObject);
    };
    QuestionService.prototype.getQuestionPageById = function (id) {
        var _this = this;
        var questionPage = {
            question: null,
            answers: []
        };
        return this.questionRepository.getById(id).then(function (question) {
            questionPage.question = question;
            return _this.answerRepository.getByQuestionId(question._id);
        }).then(function (answers) {
            questionPage.answers = answers ? answers : [];
            return questionPage;
        });
    };
    QuestionService.prototype.getUserQuestions = function (currentUser) {
        return this.questionRepository.getQuestionByAuthor(currentUser).then(function (questions) {
            return questions;
        });
    };
    QuestionService.prototype.updateQuestion = function (questionDto, user) {
        var _this = this;
        return this.questionRepository.getById(questionDto._id).then(function (questionObj) {
            _this.checkPermissionForModification(questionDto, questionObj, user);
            // do not allow user to change these
            delete questionDto.title;
            delete questionDto.author;
            delete questionDto.publicityStatus;
            delete questionDto.dateCreated;
            //TODO: errors check for other fields and send a errors or log if they are changed
            // question cannot change back into a draft
            if (questionDto.isPublished) {
                delete questionDto.isPublished;
            }
            // update last edited utc
            questionDto.lastEditedUtc = new Date(Date.now());
            questionObj = _this.mapKeysOntoObject(questionObj, questionDto);
            return _this.questionRepository.update(questionObj);
        });
    };
    return QuestionService;
}(BaseService_1.BaseService));
exports.QuestionService = QuestionService;
//# sourceMappingURL=QuestionService.js.map