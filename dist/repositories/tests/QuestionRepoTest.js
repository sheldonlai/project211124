"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QuestionRepository_1 = require("../QuestionRepository");
var Question_1 = require("../../models/Question");
var User_1 = require("../../models/User");
var FakeModels_1 = require("./helpers/FakeModels");
require('source-map-support').install();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var questionRepo = new QuestionRepository_1.QuestionRepository();
describe('QuestionRepoTest', function () {
    var fakeModels = new FakeModels_1.FakeModels();
    beforeAll(function () {
        return mongoose.connect('mongodb://admin:1122312@ds143141.mlab.com:43141/askalot');
    });
    afterAll(function () {
        return mongoose.disconnect();
    });
    beforeEach(function () {
        return Question_1.QuestionModel.remove({}).then(function () {
            return User_1.UserModel.remove({});
        });
    });
    it('should fail with no author', function () {
        var newQuestion = new Question_1.Question('title', 'content', null, [], false);
        expect.assertions(1);
        return questionRepo.create(newQuestion).catch(function (err) {
            expect(err.message).toBeDefined();
            console.log('test passed');
        });
    });
    it('should succeed', function () {
        var dateTime = new Date(2016, 1, 1);
        return User_1.UserModel.create(fakeModels.localUser()).then(function (user) {
            var newQuestion = new Question_1.Question('title', 'content', user, [], false);
            // should not be able to change last edited
            newQuestion.lastEditedUtc = dateTime;
            return questionRepo.create(newQuestion).then(function (question) {
                expect(question._id).toBeDefined();
                expect(question.title).toBe('title');
                expect(question.content).toBe('content');
                expect(question.lastEditedUtc).not.toEqual(dateTime);
                console.log('test passed', question._id);
                return;
            });
        });
    });
    it('should update', function () {
        var dateTime = new Date(2016, 1, 1);
        var new_user;
        // create user
        return User_1.UserModel.create(fakeModels.localUser()).then(function (user) {
            // create new QuestionView
            new_user = user;
            var newQuestion = new Question_1.Question('title', 'content', user, [], false);
            return questionRepo.create(newQuestion);
        }).then(function (question) {
            // update question
            expect(question._id).toBeDefined();
            question.isPublished = true;
            question.title = 'new';
            // TODO: test question.tags
            question.comments.push(new Question_1.QuestionComment(new_user, 'comment'));
            question.content = 'changed content';
            // should not change
            question.lastEditedUtc = dateTime;
            return questionRepo.update(question);
        }).then(function (question) {
            expect(question.lastEditedUtc).not.toEqual(dateTime);
            expect(question.content).toBe('changed content');
            expect(question.title).toBe('new');
            expect(question.isPublished).toBe(true);
            expect(question.comments.length).toBe(1);
        });
    });
    it('should get new question', function () {
        var new_user;
        return User_1.UserModel.create(fakeModels.localUser()).then(function (user) {
            new_user = user;
            var newQuestion = new Question_1.Question('title', 'content', user, [], false);
            return questionRepo.create(newQuestion);
        }).then(function (question) {
            return questionRepo.getById(question._id);
        }).then(function (question) {
            expect(question.title).toBe('title');
            expect(question.content).toBe('content');
        });
    });
    it('should get new question with string', function () {
        var new_user;
        return User_1.UserModel.create(fakeModels.localUser()).then(function (user) {
            new_user = user;
            var newQuestion = new Question_1.Question('title', 'content', user, [], false);
            return questionRepo.create(newQuestion);
        }).then(function (question) {
            return questionRepo.getById(question._id.toString());
        }).then(function (question) {
            expect(question.title).toBe('title');
            expect(question.content).toBe('content');
        });
    });
    it('should delete question', function () {
        var new_user;
        return User_1.UserModel.create(fakeModels.localUser()).then(function (user) {
            new_user = user;
            var newQuestion = new Question_1.Question('title', 'content', user, [], false);
            return questionRepo.create(newQuestion);
        }).then(function (question) {
            return questionRepo.deleteById(question._id);
        }).then(function () {
            return Question_1.QuestionModel.find({}).exec();
        }).then(function (questions) {
            expect(questions.length).toBe(0);
        });
    });
    it('should delete question by Id', function () {
        var new_user;
        return User_1.UserModel.create(fakeModels.localUser()).then(function (user) {
            new_user = user;
            var newQuestion = new Question_1.Question('title', 'content', user, [], false);
            return questionRepo.create(newQuestion);
        }).then(function (question) {
            return questionRepo.deleteById(question._id);
        }).then(function () {
            return Question_1.QuestionModel.find({}).exec();
        }).then(function (questions) {
            expect(questions.length).toBe(0);
        });
    });
});
//# sourceMappingURL=QuestionRepoTest.js.map