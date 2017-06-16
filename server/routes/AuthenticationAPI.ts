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

    constructor(router: Router, service: IAuthenticationService) {
        super();
        this.service = service;
        router.post(APIUrls.Login, this.login);
        router.post(APIUrls.Register, this.register);

    }

    public register = (req: Request, res: Response, next: NextFunction) => {
        let regReq: RegistrationDto = req.body;
        let result: Promise<User> = this.service.registerLocalUser(regReq.email, regReq.name, regReq.password);
        this.respondPromise(result, res, next);
    }

    public login = (req: Request, res: Response, next: NextFunction) => {
        let loginReq : LoginDto = req.body;
        let result: Promise<any> =  this.service.login(loginReq.email, loginReq.password);
        this.respondPromise(result, res, next);
    }

}
