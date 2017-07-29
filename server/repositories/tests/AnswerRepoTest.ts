import {TagModel} from "../../models/Tags";
import {CountryModel} from "../../models/LocationModels/Country"
import {Question, QuestionComment, QuestionModel} from "../../models/Question";
import {UserModel} from "../../models/User";
import {AnswerRepository} from "../AnswerRepository";
import {Answer, AnswerModel} from "../../models/Answer";
import {FakeModels} from "./helpers/FakeModels";
import {createRawDraftContentState} from "../../utils/TestUtils";
import {TestDatabase} from "./helpers/TestDatabase";
import {UniversityModel} from "../../models/LocationModels/Universities";


let ansRepo = new AnswerRepository();

describe('AnswerRepoTest', function () {

    let sampleUser;
    let sampleQuestion;
    const testDatabase = new TestDatabase();

    beforeAll(async function () {
        await testDatabase.connect();

        // load the model such that the User model will not complain
        let loadModels = {TagModel, CountryModel, UniversityModel};

        let tag = await TagModel.findOne({tag: "AnswerRepoTest"});
        if (!tag)
            tag = await TagModel.create({tag: "AnswerRepoTest"});
        await UserModel.remove({username: {$regex: "AnswerRepoTest", $options: "i"}});
        sampleUser = await UserModel.create(new FakeModels().localUser("AnswerRepoTest"));
        let newQuestion = new Question(
            'AnswerRepoTest',
            createRawDraftContentState(),
            sampleUser,
            [tag],
            false
        );
        let oldQuestion = await QuestionModel.findOne({title : newQuestion.title});
        if (oldQuestion){
            await AnswerModel.remove({question: oldQuestion.id});
            await QuestionModel.remove({_id : oldQuestion.id});
        }
        sampleQuestion = await QuestionModel.create(newQuestion);
    });

    afterAll(async function () {
        await UserModel.remove({username: {$regex: "AnswerRepoTest", $options: "i"}});
        await QuestionModel.remove({_id : sampleQuestion.id});
        return testDatabase.disconnect();
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

    it('should fail when create with no question', function () {
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
                expect(answer.upVotes).not.toBe(200);
                expect(answer.downVotes).not.toBe(100);
                return;
            })
    })

});