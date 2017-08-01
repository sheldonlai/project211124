import {QuestionModel} from "../../models/Question";
import {User, UserModel} from "../../models/User";
import {FakeModels} from "./helpers/FakeModels";
import {TestDatabase} from "./helpers/TestDatabase";
import {TagModel} from "../../models/Tags";
import {CountryModel} from "../../models/LocationModels/Country";
import {UniversityModel} from "../../models/LocationModels/Universities";
import {ITeammateRecordRepository, TeammateRecordRepository} from "../TeammateRecordRepository";
import {TeammateRating, TeammateRecord} from "../../models/TeammateRecord";

let teammateRecordRepo: ITeammateRecordRepository = new TeammateRecordRepository();
const testName = 'TeammateRecordRepoTest';

describe(testName, function () {
    let fakeModels = new FakeModels();
    let user: User;
    const testDatabase = new TestDatabase();


    beforeAll(async function () {
        await testDatabase.connect();
        // load the tag university and country model so the user model won't complain
        let loadModels = {TagModel, CountryModel, UniversityModel};
        await UserModel.remove({email: {$regex: testName, $options: "i"}});
        user = <User> (await UserModel.create(fakeModels.localUser(testName, 0))).toObject();
    });

    afterAll(async function () {
        await QuestionModel.remove({"title": {"$regex": testName, "$options": "i"}});
        await UserModel.remove({email: {$regex: testName, $options: "i"}});
        await testDatabase.disconnect();
    });

    it('create teammate', async function () {
        let newTeammate = new TeammateRecord(
            "guy",
            "test",
            "description",
            user
        );
        let result = await teammateRecordRepo.create(newTeammate);

        expect(result.createdBy._id).toEqual(user._id);
        expect(result.createdBy.local).toBeUndefined();
        expect(result.firstName).toBe(newTeammate.firstName);
        expect(result.lastName).toBe(newTeammate.lastName);
        expect(result.description).toBe(newTeammate.description);
    });

    it('update teammate', async function () {
        let newTeammate = new TeammateRecord(
            "guy",
            "test",
            "description",
            user
        );
        let result = await teammateRecordRepo.create(newTeammate);

        result.ratings.push(new TeammateRating(5, "gr8 guy", user));
        result = await teammateRecordRepo.addRating(result._id, new TeammateRating(5, "gr8 guy", user));

        expect(result.createdBy._id).toEqual(user._id);
        expect(result.createdBy.local).toBeUndefined();
        expect(result.firstName).toBe(newTeammate.firstName);
        expect(result.lastName).toBe(newTeammate.lastName);
        expect(result.description).toBe(newTeammate.description);
        expect(result.ratings.length).toBe(1);
        expect(result.ratings[0].createdBy.local).toBeUndefined();
    });
});