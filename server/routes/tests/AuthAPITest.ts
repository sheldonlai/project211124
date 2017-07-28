import {UserModel} from "../../models/User";
import {APIClient} from "./APIClient";
import {APIUrls} from "../../urls";
import {RegistrationDto} from "../../dtos/auth/RegistrationDto";
import {TestApiServer} from "./TestAPIServer";
import {AuthenticationAPI} from "../AuthenticationAPI";
import {ServiceProvider} from "../../Container";
import {LoginDto} from "../../dtos/auth/LoginDto";
import {UserDto} from "../../dtos/auth/UserDto";
import {TokenDto} from "../../dtos/auth/TokenDto";

let client = new APIClient();
let server: TestApiServer;
describe('login api test', function () {

    beforeAll(async function () {
        server = await TestApiServer.bootstrap([
            new AuthenticationAPI(ServiceProvider.AuthenticationService)
        ]);
        client.setBaseUrl("http://localhost:" + server.port);
        await UserModel.remove({username: "login_api_test"});
    });

    afterAll(async function () {
        await server.stopServer()
    });

    test('should register and login', async function () {
        try {
            let user: RegistrationDto = {
                email: 'login_api_test@doNotExist.com',
                username: 'login_api_test',
                password: 'okay',
            };
            let res: UserDto = await client.post(APIUrls.Register, user)
            expect(res.username).toBe(user.username);
            expect(res.email).toBe(user.email);
            expect((<any>res).password).toBeUndefined();
            let login: LoginDto = {
                email: user.email,
                password: user.password
            };
            let tokenDto: TokenDto = await client.post(APIUrls.Login, login);
            expect(tokenDto.token).toBeDefined();
        } catch (err) {
            console.log(err);
            expect(err).toBeUndefined();
        }
    });

});