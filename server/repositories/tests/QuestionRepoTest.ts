import {IQuestionRepository, QuestionRepository} from "../QuestionRepository";
import {Question, QuestionComment, QuestionModel} from "../../models/Question";
import {UserModel} from "../../models/User";
import {FakeModels} from "./helpers/FakeModels";
import {createRawDraftContentState} from "../../utils/TestUtils";

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let questionRepo :IQuestionRepository = new QuestionRepository();

describe('QuestionRepoTest', function (){

    let fakeModels = new FakeModels();

    beforeAll(function(){
        return mongoose.connect('mongodb://admin:1122312@ds143141.mlab.com:43141/askalot');
    });

    afterAll(function(){
        return mongoose.disconnect();
    });


    beforeEach(function () {
        return QuestionModel.remove({}).then(function(){
            return UserModel.remove({})
        })
    });

    it('should fail with no author', function () {
        let newQuestion = new Question(
           'title0', createRawDraftContentState(), null, [], false
        );
        expect.assertions(1);
        return questionRepo.create(newQuestion).catch(function(err){
            expect(err.message).toBeDefined();
            console.log('test passed')
        })
    });

    it('should succeed', function () {
        let dateTime = new Date(2016, 1 ,1);
        return UserModel.create(fakeModels.localUser()).then(function(user){
            let newQuestion = new Question(
                'title1',
                createRawDraftContentState(),
                user,
                [],
                false
            );
            // should not be able to change last edited
            newQuestion.lastEditedUtc = dateTime;
            return questionRepo.create(newQuestion).then(function(question){
                expect(question._id).toBeDefined();
                expect(question.content).toBeDefined();
                expect(question.title).toBe('title1');
                expect(question.lastEditedUtc).not.toEqual(dateTime);
                console.log('test passed', question._id);
                return;
            });
        })
    });

    it('should update', function () {
        let dateTime = new Date(2016, 1 ,1);
        let new_user;
        let prev_content;
        // create user
        return UserModel.create(fakeModels.localUser()).then(function(user){
            // create new QuestionHomeComponent
            new_user = user;
            let newQuestion = new Question(
                'title',
                createRawDraftContentState(),
                user,
                [],
                false
            );
            return questionRepo.create(newQuestion);
        }).then(function(question){
            // update question
            expect(question._id).toBeDefined();
            question.isPublished = true;
            question.title = 'new';
            // TODO: test question.tags
            question.comments.push(
                new QuestionComment(new_user, 'comment')
            );
            prev_content = question.content;
            question.content = createRawDraftContentState('changed');

            // should not change
            question.lastEditedUtc = dateTime;

            return questionRepo.update(question);
        }).then(function(question){
            expect(question.lastEditedUtc).not.toEqual(dateTime);
            expect(prev_content).toBeDefined();
            expect(question.content).not.toBe(prev_content);
            expect(question.title).toBe('new');
            expect(question.isPublished).toBe(true);
            expect(question.comments.length).toBe(1);
        })
    });

    it('should get new question', function () {
        let new_user;
        return UserModel.create(fakeModels.localUser()).then(function(user){
            new_user = user;
            let newQuestion = new Question(
                'title3',
                createRawDraftContentState(),
                user,
                [],
                false
            );
            return questionRepo.create(newQuestion);
        }).then(function(question){
            return questionRepo.getById(question._id);
        }).then(function(question){
            expect(question.title).toBe('title3');
        })
    });

    it('should get new question with string', function () {
        let new_user;
        return UserModel.create(fakeModels.localUser()).then(function(user){
            new_user = user;
            let newQuestion = new Question(
                'title4',
                createRawDraftContentState(),
                user,
                [],
                false
            );
            return questionRepo.create(newQuestion);
        }).then(function(question){
            return questionRepo.getById(question._id.toString());
        }).then(function(question){
            expect(question.title).toBe('title4');
        })
    });

    it('should delete question', function () {
        let new_user;
        return UserModel.create(fakeModels.localUser()).then(function(user){
            new_user = user;
            let newQuestion = new Question(
                'title5',
                createRawDraftContentState(),
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
            expect(questions.length).toBe(0);
        })
    });

    it('should delete question by Id', function () {
        let new_user;
        return UserModel.create(fakeModels.localUser()).then(function(user){
            new_user = user;
            let newQuestion = new Question(
                'title6',
                createRawDraftContentState(),
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
            expect(questions.length).toBe(0);
        })
    })
});