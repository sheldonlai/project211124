import {UserModel} from "../../models/User";
import {TestDatabase} from "../../repositories/tests/helpers/TestDatabase";
import {APIClient} from "./APIClient";
import {TestApiServer} from "./TestAPIServer";
import {ServiceProvider} from "../../Container";
import * as http from "http";
import {LocationAPI} from "../LocationAPI";
import {localUser} from "../../utils/TestUtils";
import {University, UniversityModel} from "../../models/LocationModels/Universities";
import {loadUniversityData} from "../../scripts/UniversityCsvLoader";
import {APIUrls} from "../../urls";

let server: TestApiServer;
let client = new APIClient();

describe('location api test', function () {

    beforeAll(async function () {
        try {
            server = await TestApiServer.bootstrap([new LocationAPI(ServiceProvider.LocationService)]);
            client.setBaseUrl("http://localhost:" + server.port);
            await UserModel.remove({username: "login_api_test"});
            await UserModel.create(localUser('location api test', undefined));
            await loadUniversityData();
        } catch (err) {
            console.error(err);
        }
    });

    afterAll(async function () {
        await server.stopServer();
    });

    test('get countries and universities', async function () {
        let results = await client.get(APIUrls.getCountries);
        expect(results.length).toBe(2);
        let unis = await client.get(APIUrls.getUniversitiesByCountry.replace(":country", results[0]._id));
        expect(unis.length).toBeGreaterThan(0);
    });


});