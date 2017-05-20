import {Container} from 'inversify';
import 'reflect-metadata'
import 'mocha'
import * as chai from 'chai';

import {IQuestionRepository, QuestionRepository} from '../../server/respositories/QuestionRepository';
import {Question, QuestionModel} from '../../server/models/Question';
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
            return repo.create(newQuestion).then(function(question){
                expect(question._id).to.be.not.equal(undefined);
                expect(question._id).to.be.not.equal(null);
                console.log('test passed', question._id)
                return;
            });
        })
    })
})