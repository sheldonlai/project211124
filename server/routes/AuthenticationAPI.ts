/**
 * Created by Phillip on 2017-06-03.
 */
import {NextFunction, Request, Response, Router} from "express";
import {IAuthenticationService} from "../services/AuthenticationService";
import {BaseAPI} from "./BaseAPI";
import {User} from "../models/User";
import {APIUrls} from "../urls";
import {RegistrationDto} from "../dtos/auth/RegistrationDto";
import {LoginDto} from "../dtos/auth/LoginDto";
export class AuthenticationAPI extends BaseAPI {

    private service : IAuthenticationService;
    public router: Router;

    constructor(service: IAuthenticationService) {
        super();
        this.router = Router();
        this.service = service;
        this.router.post(APIUrls.Login, this.login);
        this.router.post(APIUrls.Register, this.register);
        this.router.get(APIUrls.Verify, this.verify);
    }

    public register = (req: Request, res: Response, next: NextFunction) => {
        let regReq: RegistrationDto = req.body;
        let result: Promise<User> = this.service.registerLocalUser(regReq.email, regReq.username, regReq.password);
        this.respondPromise(result, res, next);
    };

    public login = (req: Request, res: Response, next: NextFunction) => {
        let loginReq : LoginDto = req.body;
        let result: Promise<any> =  this.service.login(loginReq.email, loginReq.password);
        this.respondPromise(result, res, next);
    };

    public verify = (req: Request, res: Response, next: NextFunction) => {
        let code: string = req.params.code;
        let result: Promise<User> = this.service.verifyAccount(code);
        this.respondPromise(result, res, next);
    };
}
