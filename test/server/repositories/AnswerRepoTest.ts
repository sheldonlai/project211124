import {Container} from "inversify";
import "reflect-metadata";
import "mocha";
import * as chai from "chai";
import {Question, QuestionComment, QuestionModel} from "../../../server/models/Question";
import {UserModel} from "../../../server/models/User";

import TYPES from "../../../server/enums/ClassTypes";
import {AnswerRepository, IAnswerRepository} from "../../../server/repositories/AnswerRepository";
import {Answer, AnswerModel} from "../../../server/models/Answer";
import {FakeModels} from "./helpers/FakeModels";

require('source-map-support').install();

let mongoose = require('mongoose');

mongoose.Promise = global.Promise;


let expect = chai.expect;
let container = new Container();
container.bind<IAnswerRepository>(TYPES.IQuestionRepo).to(AnswerRepository);
let ansRepo = container.get<IAnswerRepository>(TYPES.IQuestionRepo);

describe('AnswerRepoTest', function () {


    let sampleUser;
    let sampleQuestion;

    before(function(){
        return mongoose.connect('mongodb://admin:1122312@ds143141.mlab.com:43141/askalot');
    });

    after(function(){
        return mongoose.disconnect();
    });

    beforeEach(function () {
        return AnswerModel.remove({}).then(function(){
            return QuestionModel.remove({});
        }).then(function () {
            return UserModel.remove({})
        }).then(function(){
            return UserModel.create(new FakeModels().localUser())
        }).then(function(user){
            sampleUser = user;
            let newQuestion = new Question(
                'title',
                'content',
                user,
                [],
                false
            );
            return QuestionModel.create(newQuestion);
        }).then(function(question) {
            sampleQuestion = question;
            return;
        })
    });

    it ('should create new Answer', function () {
        return ansRepo.create(new Answer(sampleQuestion, 'content', sampleUser, []))
            .then(function (answer) {
                expect(answer.content).equals('content');
                expect(answer._id).not.equals(undefined);
                expect(answer.upVotes).equals(0);
                expect(answer.downVotes).equals(0);
                return;
            })
    });

    it ('should fail when create with no question', function () {
        let error_msg = "fail expected but actually passed";
        return ansRepo.create(new Answer(null, 'content', sampleUser, []))
            .then(function () {
                expect.fail(error_msg);
            }).catch(function(err){
                expect(err.message).to.be.not.equal(error_msg);
                console.log('test passed');
                return;
            })
    });

    it ('should fail when create with no author', function () {
        let error_msg = "fail expected but actually passed";
        return ansRepo.create(new Answer(null, 'content', sampleUser, []))
            .then(function () {
                expect.fail(error_msg);
            }).catch(function(err){
                expect(err.message).to.be.not.equal(error_msg);
                console.log('test passed');
                return;
            })
    });

    it('should updated ', function () {
        return ansRepo.create(new Answer(sampleQuestion, 'content', sampleUser, []))
            .then(function (answer) {
                answer.content = 'new content';
                answer.comments.push(new QuestionComment(
                    sampleUser, 'good'
                ));
                answer.downVotes = 100;
                answer.upVotes = 200;
                return ansRepo.update(answer);
            }).then(function (answer){
                expect(answer.comments.length).equals(1);
                expect(answer.upVotes).equals(200);
                expect(answer.downVotes).equals(100);
                expect(answer.content).equals('new content');
                return;
            })
    })

});