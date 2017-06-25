"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Question_1 = require("../../models/Question");
var User_1 = require("../../models/User");
var AnswerRepository_1 = require("../AnswerRepository");
var Answer_1 = require("../../models/Answer");
var FakeModels_1 = require("./helpers/FakeModels");
require('source-map-support').install();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var ansRepo = new AnswerRepository_1.AnswerRepository();
describe('AnswerRepoTest', function () {
    var sampleUser;
    var sampleQuestion;
    beforeAll(function () {
        return mongoose.connect('mongodb://admin:1122312@ds143141.mlab.com:43141/askalot');
    });
    afterAll(function () {
        return mongoose.disconnect();
    });
    beforeEach(function () {
        return Answer_1.AnswerModel.remove({}).then(function () {
            return Question_1.QuestionModel.remove({});
        }).then(function () {
            return User_1.UserModel.remove({});
        }).then(function () {
            return User_1.UserModel.create(new FakeModels_1.FakeModels().localUser());
        }).then(function (user) {
            sampleUser = user;
            var newQuestion = new Question_1.Question('title', 'content', user, [], false);
            return Question_1.QuestionModel.create(newQuestion);
        }).then(function (question) {
            sampleQuestion = question;
            return;
        });
    });
    it('should create new Answer', function () {
        return ansRepo.create(new Answer_1.Answer(sampleQuestion, 'content', sampleUser, []))
            .then(function (answer) {
            expect(answer.content).toBe('content');
            expect(answer._id).not.toBe(undefined);
            expect(answer.upVotes).toBe(0);
            expect(answer.downVotes).toBe(0);
            return;
        });
    });
    it('should fail when create with no question', function () {
        expect.assertions(1);
        return ansRepo.create(new Answer_1.Answer(null, 'content', sampleUser, []))
            .catch(function (err) {
            expect(err.message).toBeDefined();
            return;
        });
    });
    it('should fail when create with no author', function () {
        expect.assertions(1);
        return ansRepo.create(new Answer_1.Answer(null, 'content', sampleUser, []))
            .catch(function (err) {
            expect(err.message).toBeDefined();
            return;
        });
    });
    it('should updated ', function () {
        return ansRepo.create(new Answer_1.Answer(sampleQuestion, 'content', sampleUser, []))
            .then(function (answer) {
            answer.content = 'new content';
            answer.comments.push(new Question_1.QuestionComment(sampleUser, 'good'));
            answer.downVotes = 100;
            answer.upVotes = 200;
            return ansRepo.update(answer);
        }).then(function (answer) {
            expect(answer.comments.length).toBe(1);
            expect(answer.upVotes).toBe(200);
            expect(answer.downVotes).toBe(100);
            expect(answer.content).toBe('new content');
            return;
        });
    });
});
//# sourceMappingURL=AnswerRepoTest.js.map