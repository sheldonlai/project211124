import {Container} from "inversify";
import "reflect-metadata";
import "mocha";
import * as chai from "chai";
import {IQuestionRepository, QuestionRepository} from "../../../server/repositories/QuestionRepository";
import {Question, QuestionComment, QuestionModel} from "../../../server/models/Question";
import {UserModel} from "../../../server/models/User";

import TYPES from "../../../server/enums/ClassTypes";
import {FakeModels} from "./helpers/FakeModels";

require('source-map-support').install();

let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let expect = chai.expect;
let container = new Container();
container.bind<IQuestionRepository>(TYPES.IQuestionRepo).to(QuestionRepository);
let questionRepo :IQuestionRepository = container.get<IQuestionRepository>(TYPES.IQuestionRepo);

describe('QuestionRepoTest', function (){

    let fakeModels = new FakeModels();

    before(function(){
        return mongoose.connect('mongodb://admin:1122312@ds143141.mlab.com:43141/askalot');
    });

    after(function(){
        return mongoose.disconnect();
    });


    beforeEach(function () {
        return QuestionModel.remove({}).then(function(){
            return UserModel.remove({})
        })
    });

    it('should fail with no author', function () {
        let error_msg = 'should fail';
        let newQuestion = new Question(
           'title', 'content', null, [], false
        );
        return questionRepo.create(newQuestion).then(function(){
            expect.fail(error_msg);
        }).catch(function(err){
            expect(err.message).to.be.not.equal(error_msg);
            console.log('test passed')
        })
    });

    it('should succeed', function () {
        let dateTime = new Date(2016, 1 ,1);
        return UserModel.create(fakeModels.localUser()).then(function(user){
            let newQuestion = new Question(
                'title',
                'content',
                user,
                [],
                false
            );
            // should not be able to change last edited
            newQuestion.lastEditedUtc = dateTime;
            return questionRepo.create(newQuestion).then(function(question){
                expect(question._id).to.be.not.equal(undefined);
                expect(question._id).to.be.not.equal(null);
                expect(question.title).equals('title');
                expect(question.content).equals('content');
                expect(question.lastEditedUtc).to.be.not.eql(dateTime);
                console.log('test passed', question._id);
                return;
            });
        })
    });

    it('should update', function () {
        let dateTime = new Date(2016, 1 ,1);
        let new_user;
        // create user
        return UserModel.create(fakeModels.localUser()).then(function(user){
            // create new Question
            new_user = user;
            let newQuestion = new Question(
                'title',
                'content',
                user,
                [],
                false
            );
            return questionRepo.create(newQuestion);
        }).then(function(question){
            // update question
            expect(question._id).to.be.not.equal(undefined);
            question.isPublished = true;
            question.title = 'new';
            // TODO: test question.tags
            question.comments.push(
                new QuestionComment(new_user, 'comment')
            );
            question.content = 'changed content';

            // should not change
            question.lastEditedUtc = dateTime;

            return questionRepo.update(question);
        }).then(function(question){
            expect(question.lastEditedUtc).not.eql(dateTime);
            expect(question.content).equals('changed content');
            expect(question.title).equals('new');
            expect(question.isPublished).equals(true);
            expect(question.comments.length).equals(1);
        })
    });

    it('should get new question', function () {
        let new_user;
        return UserModel.create(fakeModels.localUser()).then(function(user){
            new_user = user;
            let newQuestion = new Question(
                'title',
                'content',
                user,
                [],
                false
            );
            return questionRepo.create(newQuestion);
        }).then(function(question){
            return questionRepo.getById(question._id);
        }).then(function(question){
            expect(question.title).equals('title');
            expect(question.content).equals('content');
        })
    });

    it('should get new question with string', function () {
        let new_user;
        return UserModel.create(fakeModels.localUser()).then(function(user){
            new_user = user;
            let newQuestion = new Question(
                'title',
                'content',
                user,
                [],
                false
            );
            return questionRepo.create(newQuestion);
        }).then(function(question){
            return questionRepo.getById(question._id.toString());
        }).then(function(question){
            expect(question.title).equals('title');
            expect(question.content).equals('content');
        })
    });

    it('should delete question', function () {
        let new_user;
        return UserModel.create(fakeModels.localUser()).then(function(user){
            new_user = user;
            let newQuestion = new Question(
                'title',
                'content',
                user,
                [],
                false
            );
            return questionRepo.create(newQuestion);
        }).then(function(question){
            return questionRepo.deleteById(question._id);
        }).then(function(){
            return QuestionModel.find({}).exec();
        }).then(function(questions){
            expect(questions.length).equals(0);
        })
    });

    it('should delete question by Id', function () {
        let new_user;
        return UserModel.create(fakeModels.localUser()).then(function(user){
            new_user = user;
            let newQuestion = new Question(
                'title',
                'content',
                user,
                [],
                false
            );
            return questionRepo.create(newQuestion);
        }).then(function(question){
            return questionRepo.deleteById(question._id);
        }).then(function(){
            return QuestionModel.find({}).exec();
        }).then(function(questions){
            expect(questions.length).equals(0);
        })
    })
});