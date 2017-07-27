import {UserModel} from "../../models/User";
import {TestDatabase} from "../../repositories/tests/helpers/TestDatabase";
import {FakeModels} from "../../repositories/tests/helpers/FakeModels";
import {APIClient} from "./APIClient";
import {APIUrls} from "../../urls";
import {RegistrationDto} from "../../dtos/auth/RegistrationDto";
import * as express from "express";
import {TestApiServer} from "./TestAPIServer";
import {AuthenticationAPI} from "../AuthenticationAPI";

describe('login api test', function () {

    let sampleQuestion;
    const testDatabase = new TestDatabase();

    beforeAll(function () {
        TestApiServer([AuthenticationAPI])
        return testDatabase.connect()
            .then(function () {
                return UserModel.create(new FakeModels().localUser())
            });
    });

    afterAll(function () {
        return testDatabase.disconnect();
    });

    beforeEach(function () {
    });

    test('should register and login', function () {
        let client = new APIClient();
        let user: RegistrationDto = {
            email : 'login_api_test@doNotExist.com',
            username : 'login_api_test',
            password : 'okay',
        };
        return client.post(APIUrls.Register, user).then((res) => {
            // expect(res).toBe

            return undefined;
        });
    });

});