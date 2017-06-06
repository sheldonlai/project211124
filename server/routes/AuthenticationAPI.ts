/**
 * Created by Phillip on 2017-06-03.
 */
import {NextFunction, Request, Response, Router} from "express";
import {APIUrls} from "../../common/urls";
import {IAuthenticationService} from "../services/AuthenticationService";
import {BaseAPI} from "./BaseAPI";
import {User} from "../models/User";
import {RegistrationDto} from '../../common/dtos/auth/RegistrationDto';
import {LoginDto} from '../../common/dtos/auth/LoginDto';
import {TokenDto} from '../../common/dtos/auth/TokenDto';

export class AuthenticationAPI extends BaseAPI {

    private service : IAuthenticationService;

    constructor(router: Router, service: IAuthenticationService) {
        super();
        this.service = service;
        router.post(APIUrls.Register, this.register);

    }

    public register = (req: Request, res: Response, next: NextFunction) => {
        let regReq: RegistrationDto = req.body;
        let result: Promise<User> = this.service.registerLocalUser(regReq.email, regReq.username, regReq.password);
        this.respondPromise(result, res, next);
    }

    public login = (req: Request, res: Response, next: NextFunction) => {
        let loginReq : LoginDto = req.body;
        let result: Promise<any> =  this.service.login(loginReq.email, loginReq.password);
    }

}
