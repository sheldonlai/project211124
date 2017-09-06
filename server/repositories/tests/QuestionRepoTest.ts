import {IQuestionRepository, QuestionRepository} from "../QuestionRepository";
import {Question, QuestionComment, QuestionModel} from "../../models/Question";
import {User, UserModel} from "../../models/User";
import {FakeModels} from "./helpers/FakeModels";
import {createRawDraftContentState} from "../../utils/TestUtils";
import {TestDatabase} from "./helpers/TestDatabase";
import {UserQuestionVote, UserQuestionVoteModel} from "../../models/UserQuestionVote";
import {TagModel} from "../../models/Tags";
import {CountryModel} from "../../models/LocationModels/Country";
import {UniversityModel} from "../../models/LocationModels/Universities";
import {AppError} from "../../errors/AppError";

let questionRepo: IQuestionRepository = new QuestionRepository();

describe('QuestionRepoTest', function () {
    let fakeModels = new FakeModels();
    let user: User;
    const testDatabase = new TestDatabase();


    beforeAll(async function () {
        await testDatabase.connect();
        // load the tag university and country model so the user model won't complain
        let loadModels = {TagModel, CountryModel, UniversityModel};
        await UserModel.remove({email: {$regex: "QuestionRepoTest", $options: "i"}});
        user = await UserModel.create(fakeModels.localUser("QuestionRepoTest", 0));
    });

    afterAll(async function () {
        await QuestionModel.remove({"title": {"$regex": "QuestionRepoTest", "$options": "i"}});
        await UserModel.remove({email: {$regex: "QuestionRepoTest", $options: "i"}});
        await testDatabase.disconnect();
    });


    beforeEach(async function () {
        await QuestionModel.remove({"title": {"$regex": "QuestionRepoTest", "$options": "i"}});
    });

    it('should fail with no author', async function () {
        let newQuestion = new Question(
            'QuestionRepoTest0', createRawDraftContentState(), null, [], false
        );
        expect.assertions(1);
        return questionRepo.create(newQuestion).catch(function (err) {
            expect(err.message).toBeDefined();
        })
    });

    it('should succeed', async function () {
        let dateTime = new Date(2016, 1, 1);
        let newQuestion = new Question(
            'QuestionRepoTest1',
            createRawDraftContentState(),
            user,
            [],
            false
        );
        // should not be able to change last edited
        newQuestion.lastEditedUtc = dateTime;
        let question = await questionRepo.create(newQuestion);
        expect(question._id).toBeDefined();
        expect(question.content).toBeDefined();
        expect(question.title).toBe('QuestionRepoTest1');
        expect(question.lastEditedUtc).not.toEqual(dateTime);
        expect(question.author.local).toBeUndefined();
        expect(question.author.email).toBeUndefined();
        expect(question.author.role).toBeUndefined();
    });

    it('should update', async function () {

        let prev_content;
        // create user
        let newUser: User = await UserModel.create(fakeModels.localUser("QuestionRepoTest", 1));
        // create new QuestionHomeComponent
        let newQuestion = new Question(
            'QuestionRepoTest',
            createRawDraftContentState(),
            user,
            [],
            false
        );
        let question = await questionRepo.create(newQuestion);
        // update question
        expect(question._id).toBeDefined();
        question.isPublished = true;
        question.title = 'QuestionRepoTestNew';
        // TODO: test question.tags
        question.comments.push(
            new QuestionComment(newUser, 'comment')
        );
        prev_content = question.content;
        question.content = createRawDraftContentState('changed');

        question = await questionRepo.update(question);
        // should not change
        expect(prev_content).toBeDefined();
        expect(question.content).not.toBe(prev_content);
        expect(question.title).toBe('QuestionRepoTestNew');
        expect(question.isPublished).toBe(true);
        expect(question.comments.length).toBe(1);
        expect(question.comments[0].commentBy.local).toBeUndefined();
        expect(question.comments[0].commentBy.email).toBeUndefined();
        expect(question.comments[0].commentBy.role).toBeUndefined();

    });

    it('should get new question', async function () {
        let newQuestion = new Question(
            'QuestionRepoTest3',
            createRawDraftContentState(),
            user,
            [],
            false
        );
        let question = await questionRepo.create(newQuestion);
        question = await questionRepo.getById(question._id);
        expect(question.title).toBe('QuestionRepoTest3');
    });

    it('should get new question with string id', async function () {
        let newQuestion = new Question(
            'QuestionRepoTest4',
            createRawDraftContentState(),
            user,
            [],
            false
        );
        let question = await questionRepo.create(newQuestion);
        question = await questionRepo.getById(question._id.toString());
        expect(question.title).toBe('QuestionRepoTest4');
    });

    it('should delete question', async function () {
        expect.assertions(2);
        let newQuestion = new Question(
            'QuestionRepoTest5',
            createRawDraftContentState(),
            user,
            [],
            false
        );
        let question = await questionRepo.create(newQuestion);
        await questionRepo.deleteById(question._id);
        await questionRepo.getById(question._id).catch((err: AppError) => {
            expect(err).toBeDefined();
            expect(err.status.code).toBe(400);
        })
    });

    it('should create and get amount of up votes', async function () {
        let newQuestion = new Question(
            'QuestionRepoTest7',
            createRawDraftContentState(),
            user,
            [],
            false
        );
        let question = await questionRepo.create(newQuestion);
        let promises = [];
        for (let i = 0; i < 142; i++) {
            promises.push(
                UserModel.create(fakeModels.localUser("QuestionRepoTest", i + 100)).then((user) => {
                    return questionRepo.findOneAndUpdateVoteQuestion(
                        new UserQuestionVote(user._id, question._id, true)
                    );
                })
            )

        }
        await Promise.all(promises);
        let updatedQuestion = await questionRepo.getById(question._id);
        expect(updatedQuestion.upVotes).toBe(142);
    })
});