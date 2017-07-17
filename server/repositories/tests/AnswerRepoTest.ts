import {Question, QuestionComment, QuestionModel} from "../../models/Question";
import {UserModel} from "../../models/User";
import {AnswerRepository} from "../AnswerRepository";
import {Answer, AnswerModel} from "../../models/Answer";
import {FakeModels} from "./helpers/FakeModels";
import {createRawDraftContentState} from "../../utils/TestUtils";
import {TestDatabase} from "./helpers/TestDatabase";

require('source-map-support').install();

let ansRepo = new AnswerRepository();

describe('AnswerRepoTest', function () {

    let sampleUser;
    let sampleQuestion;
    const testDatabase = new TestDatabase();

    beforeAll(function () {
        return testDatabase.connect()
            .then(function () {
                return UserModel.create(new FakeModels().localUser())
            }).then(function (user) {
                sampleUser = user;
                let newQuestion = new Question(
                    'AnswerRepoTest',
                    createRawDraftContentState(),
                    user,
                    [],
                    false
                );
                return QuestionModel.create(newQuestion);
            }).then(function (question) {
                sampleQuestion = question;
                return;
            });
    });

    afterAll(function () {
        return testDatabase.disconnect();
    });

    beforeEach(function () {
        return AnswerModel.remove({}).then(function () {
            return QuestionModel.remove({title : {$ne: sampleQuestion.title}});
        }).then(function () {
            return UserModel.remove({name: {$ne: sampleUser.name}})
        })
    });

    it('should create new Answer', function () {
        return ansRepo.create(new Answer(sampleQuestion, createRawDraftContentState(), sampleUser, []))
            .then(function (answer) {
                expect(answer.content).toBeDefined();
                expect(answer._id).not.toBe(undefined);
                expect(answer.upVotes).toBe(0);
                expect(answer.downVotes).toBe(0);
                return;
            })
    });

    it('should fail when create with no questionHome', function () {
        expect.assertions(1);
        return ansRepo.create(new Answer(null, createRawDraftContentState(), sampleUser, []))
            .catch(function (err) {
                expect(err.message).toBeDefined();
                return;
            })
    });

    it('should fail when create with no author', function () {
        expect.assertions(1);
        return ansRepo.create(new Answer(null, createRawDraftContentState(), sampleUser, []))
            .catch(function (err) {
                expect(err.message).toBeDefined();
                return;
            })
    });

    it('should updated ', function () {
        return ansRepo.create(new Answer(sampleQuestion, createRawDraftContentState(), sampleUser, []))
            .then(function (answer) {
                answer.content = createRawDraftContentState();
                answer.comments.push(new QuestionComment(
                    sampleUser, 'good'
                ));
                answer.downVotes = 100;
                answer.upVotes = 200;
                return ansRepo.update(answer);
            }).then(function (answer) {
                expect(answer.content).toBeDefined();
                expect(answer.comments.length).toBe(1);
                expect(answer.upVotes).toBe(200);
                expect(answer.downVotes).toBe(100);
                return;
            })
    })

});