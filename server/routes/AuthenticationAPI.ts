/**
 * Created by Phillip on 2017-06-03.
 */
import {NextFunction, Request, Response, Router} from "express";
import {APIUrls} from "../../common/urls";
import {IAuthenticationService} from "../services/AuthenticationService";
import {BaseAPI} from "./BaseAPI";
import {User} from "../models/User";

export class AuthenticationAPI extends BaseAPI {

    private service : IAuthenticationService;

    constructor(router: Router, service: IAuthenticationService) {
        super();
        this.service = service;
        router.get(APIUrls.Register, this.register);

    }

    public register = (req: Request, res: Response, next: NextFunction) => {
        let result: Promise<User> = this.service.registerLocalUser("jieyifei@hotmail.com", "Phil Jie", "123123")
        this.respondPromise(result, res, next);
    }

}
