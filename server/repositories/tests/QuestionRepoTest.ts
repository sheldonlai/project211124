import {IQuestionRepository, QuestionRepository} from "../QuestionRepository";
import {Question, QuestionComment, QuestionModel} from "../../models/Question";
import {UserModel} from "../../models/User";
import {FakeModels} from "./helpers/FakeModels";
import {createRawDraftContentState} from "../../utils/TestUtils";
import {TestDatabase} from "./helpers/TestDatabase";
import {UserQuestionVote, UserQuestionVoteModel} from "../../models/UserQuestionVote";
import {TagModel} from "../../models/Tags";

let questionRepo: IQuestionRepository = new QuestionRepository();

describe('QuestionRepoTest', function () {

    let fakeModels = new FakeModels();
    const testDatabase = new TestDatabase();


    beforeAll(function () {
        return testDatabase.connect();
    });

    afterAll(function () {
        return testDatabase.disconnect();
    });


    beforeEach(function () {
        return QuestionModel.remove({"title": {"$regex": "QuestionRepoTest", "$options": "i"}})
            .then(function () {

                return TagModel.remove({}).exec()
                    .then(() => UserModel.remove({}));
            })
    });

    it('should fail with no author', function () {
        let newQuestion = new Question(
            'QuestionRepoTest0', createRawDraftContentState(), null, [], false
        );
        expect.assertions(1);
        return questionRepo.create(newQuestion).catch(function (err) {
            expect(err.message).toBeDefined();
            console.log('test passed')
        })
    });

    it('should succeed', function () {
        let dateTime = new Date(2016, 1, 1);
        return UserModel.create(fakeModels.localUser()).then((user) => {
            let newQuestion = new Question(
                'QuestionRepoTest1',
                createRawDraftContentState(),
                user,
                [],
                false
            );
            // should not be able to change last edited
            newQuestion.lastEditedUtc = dateTime;
            return questionRepo.create(newQuestion).then((question) => {
                expect(question._id).toBeDefined();
                expect(question.content).toBeDefined();
                expect(question.title).toBe('QuestionRepoTest1');
                expect(question.lastEditedUtc).not.toEqual(dateTime);
                console.log('test passed', question._id);
                return;
            });
        })
    });

    it('should update', function () {
        let dateTime = new Date(2016, 1, 1);
        let new_user;
        let prev_content;
        // create user
        return UserModel.create(fakeModels.localUser()).then(function (user) {
            // create new QuestionHomeComponent
            new_user = user;
            let newQuestion = new Question(
                'QuestionRepoTest',
                createRawDraftContentState(),
                user,
                [],
                false
            );
            return questionRepo.create(newQuestion);
        }).then(function (question) {
            // update questionHome
            expect(question._id).toBeDefined();
            question.isPublished = true;
            question.title = 'QuestionRepoTestNew';
            // TODO: test questionHome.tags
            question.comments.push(
                new QuestionComment(new_user, 'comment')
            );
            prev_content = question.content;
            question.content = createRawDraftContentState('changed');

            // should not change
            question.lastEditedUtc = dateTime;

            return questionRepo.update(question);
        }).then(function (question) {
            expect(question.lastEditedUtc).not.toEqual(dateTime);
            expect(prev_content).toBeDefined();
            expect(question.content).not.toBe(prev_content);
            expect(question.title).toBe('QuestionRepoTestNew');
            expect(question.isPublished).toBe(true);
            expect(question.comments.length).toBe(1);
        })
    });

    it('should get new questionHome', function () {
        let new_user;
        return UserModel.create(fakeModels.localUser()).then(function (user) {
            new_user = user;
            let newQuestion = new Question(
                'QuestionRepoTest3',
                createRawDraftContentState(),
                user,
                [],
                false
            );
            return questionRepo.create(newQuestion);
        }).then(function (question) {
            return questionRepo.getById(question._id);
        }).then(function (question) {
            expect(question.title).toBe('QuestionRepoTest3');
        })
    });

    it('should get new questionHome with string', function () {
        let new_user;
        return UserModel.create(fakeModels.localUser()).then(function (user) {
            new_user = user;
            let newQuestion = new Question(
                'QuestionRepoTest4',
                createRawDraftContentState(),
                user,
                [],
                false
            );
            return questionRepo.create(newQuestion);
        }).then(function (question) {
            return questionRepo.getById(question._id.toString());
        }).then(function (question) {
            expect(question.title).toBe('QuestionRepoTest4');
        })
    });

    it('should delete questionHome', function () {
        let new_user;
        return UserModel.create(fakeModels.localUser()).then(function (user) {
            new_user = user;
            let newQuestion = new Question(
                'QuestionRepoTest5',
                createRawDraftContentState(),
                user,
                [],
                false
            );
            return questionRepo.create(newQuestion);
        }).then(function (question) {
            return questionRepo.deleteById(question._id);
        }).then(function () {
            return QuestionModel.find({}).exec();
        }).then(function (questions) {
            expect(questions.length).toBe(0);
        })
    });

    it('should delete questionHome by Id', function () {
        let new_user;
        return UserModel.create(fakeModels.localUser()).then(function (user) {
            new_user = user;
            let newQuestion = new Question(
                'QuestionRepoTest6',
                createRawDraftContentState(),
                user,
                [],
                false
            );
            return questionRepo.create(newQuestion);
        }).then(function (question) {
            return questionRepo.deleteById(question._id);
        }).then(function () {
            return QuestionModel.find({}).exec();
        }).then(function (questions) {
            expect(questions.length).toBe(0);
        })
    })

    it('should create and get amount of up votes', function () {
        let new_user;
        return UserModel.create(fakeModels.localUser()).then(function (user) {
            new_user = user;
            let newQuestion = new Question(
                'QuestionRepoTest7',
                createRawDraftContentState(),
                user,
                [],
                false
            );
            return questionRepo.create(newQuestion);
        }).then(function (question) {
            let promises = [];
            for (let i = 0; i < 142; i++) {
                promises.push(
                    UserModel.create(fakeModels.localUser("QuestionRepoTest", i)).then((user) =>{
                        return questionRepo.findOneAndUpdateVoteQuestion(
                            new UserQuestionVote(user._id, question._id, true)
                        );
                    })
                )

            }
            return Promise.all(promises);
        }).then((questions: Question[]) => {
            return questionRepo.getById(questions[0]._id);
        }).then(question => {
            return expect(question.upVotes).toBe(142);
        })
    })
});