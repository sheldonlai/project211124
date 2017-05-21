import {Container} from 'inversify';
import 'reflect-metadata'
import 'mocha'
import * as chai from 'chai';

require('source-map-support').install();

import {IQuestionRepository, QuestionRepository} from '../../server/respositories/QuestionRepository';
import {Question, QuestionComment, QuestionModel} from '../../server/models/Question';
import {UserModel} from '../../server/models/User';
import {UserTypeEnum} from '../../server/enums/UserTypeEnum'

import TYPES from '../../server/enums/ClassTypes';

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test');

var expect = chai.expect;
let container = new Container();
container.bind<IQuestionRepository>(TYPES.IQuestionRepo).to(QuestionRepository);
let repo :IQuestionRepository = container.get<IQuestionRepository>(TYPES.IQuestionRepo);

describe('QuestionRepoTest', function (){

    beforeEach(function () {
        QuestionModel.remove({}).then(function(){
            return UserModel.remove({})
        })
    })

    it('should fail with no author', function () {
        let error_msg = 'should fail';
        let newQuestion = new Question(
           'title',
            'content',
            null,
            [],
            false
        )
        return repo.create(newQuestion).then(function(q){
            expect.fail(error_msg);
        }).catch(function(err){
            expect(err.message).to.be.not.equal(error_msg);
            console.log('test passed')
        })
    })

    it('should succeed', function () {
        let dateTime = new Date(2016, 1 ,1);
        return UserModel.create({
            email: 's',
            name: 's',
            role: UserTypeEnum.ADMIN
        }).then(function(user){
            let newQuestion = new Question(
                'title',
                'content',
                user,
                [],
                false
            )
            // should not be able to change last edited
            newQuestion.lastEditedUtc = dateTime;
            return repo.create(newQuestion).then(function(question){
                expect(question._id).to.be.not.equal(undefined);
                expect(question._id).to.be.not.equal(null);
                expect(question.title).equals('title');
                expect(question.content).equals('content');
                expect(question.lastEditedUtc).to.be.not.eql(dateTime);
                console.log('test passed', question._id)
                return;
            });
        })
    })

    it('should update', function () {
        let dateTime = new Date(2016, 1 ,1);
        let new_user;
        // create user
        return UserModel.create({
            email: 's',
            name: 's',
            role: UserTypeEnum.ADMIN
        }).then(function(user){
            // create new Question
            new_user = user;
            let newQuestion = new Question(
                'title',
                'content',
                user,
                [],
                false
            )
            return repo.create(newQuestion);
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

            return repo.update(question);
        }).then(function(question){
            expect(question.lastEditedUtc).not.eql(dateTime);
            expect(question.content).equals('changed content');
            expect(question.title).equals('new');
            expect(question.isPublished).equals(true);
            expect(question.comments.length).equals(1);
        })
    })

    it('should get new question', function () {
        let new_user;
        return UserModel.create({
            email: 's',
            name: 's',
            role: UserTypeEnum.ADMIN
        }).then(function(user){
            new_user = user;
            let newQuestion = new Question(
                'title',
                'content',
                user,
                [],
                false
            )
            return repo.create(newQuestion);
        }).then(function(question){
            return repo.getById(question._id);
        }).then(function(question){
            expect(question.title).equals('title');
            expect(question.content).equals('content');
        })
    })

    it('should get new question with string', function () {
        let new_user;
        return UserModel.create({
            email: 's',
            name: 's',
            role: UserTypeEnum.ADMIN
        }).then(function(user){
            new_user = user;
            let newQuestion = new Question(
                'title',
                'content',
                user,
                [],
                false
            )
            return repo.create(newQuestion);
        }).then(function(question){
            return repo.getById(question._id.toString());
        }).then(function(question){
            expect(question.title).equals('title');
            expect(question.content).equals('content');
        })
    })
})