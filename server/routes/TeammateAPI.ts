import {NextFunction, Request, Response, Router} from "express";
import {BaseAPI} from "./BaseAPI";
import {APIUrls} from "../urls";
import {ILocationService} from "../services/LocationService";
import {IUserService} from "../services/UserService";
import {AuthRequest, mustBeAuthenticated} from "../middlewares/AuthMiddleware";

export class UserAPI extends BaseAPI {

    private service : IUserService;

    constructor(router: Router,
                service: IUserService) {
        super();
        this.service = service;
        router.put(APIUrls.updateProfile, mustBeAuthenticated, this.createTeammateRecord);

    }

    public createTeammateRecord = (req: AuthRequest, res: Response, next: NextFunction) => {
        const currentUser = req.user;
        // const promise = this.service.updateUser(user, currentUser);
        // this.respondPromise(promise, res, next);
    };

}
