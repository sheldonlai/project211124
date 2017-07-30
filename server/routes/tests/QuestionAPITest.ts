import {User, UserModel} from "../../models/User";
import {APIClient} from "./APIClient";
import {TestApiServer} from "./TestAPIServer";
import {ServiceProvider} from "../../Container";
import {createRawDraftContentState, localUser} from "../../utils/TestUtils";
import {APIUrls} from "../../urls";
import {QuestionAPI} from "../QuestionAPI";
import {Question, QuestionModel} from "../../models/Question";
import {generateToken} from "../../utils/JsonWebTokenUtil";
import {QuestionDto} from "../../dtos/q&a/QuestionDto";
import {QuestionPageDto} from "../../dtos/q&a/QuestionPageDto";
import {QuestionPreviewCollectionsDto} from "../../dtos/q&a/QuestionPreviewCollectionsDto";

let server: TestApiServer;
let client = new APIClient();
let user: User;

describe('question api test', function () {

    beforeAll(async function () {
        try {
            server = await TestApiServer.bootstrap([new QuestionAPI(ServiceProvider.QuestionService)]);
            client.setBaseUrl("http://localhost:" + server.port);
            await QuestionModel.remove({title: {"$regex": "question_api_test", "$options": "i"}});
            await UserModel.remove({username: "question_api_test"});
            let tempUser = localUser('question_api_test', undefined);
            await UserModel.create(tempUser);
            user = await <Promise<User>> UserModel.findOne({username: tempUser.username}).lean().exec();
            client.setToken("Token " + generateToken(user));
        } catch (err) {
            console.error(err);
            throw err;
        }
    });

    afterAll(async function () {
        await QuestionModel.remove({title: {"$regex": "question_api_test", "$options": "i"}});
        await UserModel.remove({username: "question_api_test"});
        await server.stopServer();
    });

    test('work flow 1', async function () {
        let question = new Question(
            "question_api_test", createRawDraftContentState(), user, []
        );
        let result: QuestionDto = await client.post(APIUrls.CreateQuestion, question);
        expect(result.author.username).toEqual(user.username);
        expect(result.title).toBe(question.title);

        let questionPreviews: QuestionPreviewCollectionsDto = await client.get(APIUrls.QuestionPreviews);
        expect(questionPreviews.myQuestions.filter((q) => q._id === result._id).length).toBe(1);

        let questionPage: QuestionPageDto = await client.get(APIUrls.GetQuestionPage.replace(":id", result._id));
        expect(questionPage).toBeDefined();

        questionPage.question.title = "question_api_test_2";
        questionPage.question.content = createRawDraftContentState(
            "Hello, it's me."
        );
        let updatedResult: QuestionDto = await client.put(APIUrls.UpdateQuestion, questionPage.question);
        expect(updatedResult).not.toEqual(result);
        expect(updatedResult.title).toEqual(questionPage.question.title);
        expect(updatedResult.content).toEqual(questionPage.question.content);

        updatedResult.title = "question_api_test should not change";
        let upVotedResult: QuestionDto = await client.put(APIUrls.UpVoteQuestion, updatedResult);
        expect(upVotedResult.title).not.toEqual(updatedResult.title);
        expect(upVotedResult.upVotes).toBe(1);

        let downVotedResult: QuestionDto = await client.put(APIUrls.DownVoteQuestion, upVotedResult);
        expect(downVotedResult.title).not.toEqual(updatedResult.title);
        expect(downVotedResult.downVotes).toBe(1);
        expect(downVotedResult.upVotes).toBe(0);
    });

});