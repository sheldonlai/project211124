import {NextFunction, Request, Response, Router} from "express";
import {BaseAPI} from "./BaseAPI";
import {APIUrls} from "../urls";
import {ILocationService} from "../services/LocationService";
import {IUserService} from "../services/UserService";
import {AuthRequest, mustBeAuthenticated} from "../middlewares/AuthMiddleware";
import {ITeammateRecordService} from "../services/TeammateRecordService";

export class TeammateAPI extends BaseAPI {

    private service : ITeammateRecordService;

    constructor(router: Router,
                service: ITeammateRecordService) {
        super();
        this.service = service;
        router.put(APIUrls.createTeammateRecord, mustBeAuthenticated, this.createTeammateRecord);
        // static createTeammateRecord="/create-teammate-record";
        // static getTeammateRecordPreview="/get-teammate-previews";
        // static getTeammateRecord="/get-teammate-record/:id";
        // static addRating="/add-teammate-rating";
        // static editRating="/edit-teammate-rating";

    }

    public createTeammateRecord = (req: AuthRequest, res: Response, next: NextFunction) => {
        const currentUser = req.user;
        const createDto = req.body;
        const promise = this.service.createTeammateRecordRepo(createDto, currentUser);
        this.respondPromise(promise, res, next);
    };

    public getTeammateRecordPreview = (req: AuthRequest, res: Response, next: NextFunction) => {
        const currentUser = req.user;
        const createDto = req.body;
        const promise = this.service.createTeammateRecordRepo(createDto, currentUser);
        this.respondPromise(promise, res, next);
    };

    public getTeammateRecord = (req: AuthRequest, res: Response, next: NextFunction) => {
        const currentUser = req.user;
        const createDto = req.body;
        const promise = this.service.createTeammateRecordRepo(createDto, currentUser);
        this.respondPromise(promise, res, next);
    };

    public addTeammateRating = (req: AuthRequest, res: Response, next: NextFunction) => {
        const currentUser = req.user;
        const createDto = req.body;
        const promise = this.service.createTeammateRecordRepo(createDto, currentUser);
        this.respondPromise(promise, res, next);
    };

    public editTeammateRating = (req: AuthRequest, res: Response, next: NextFunction) => {
        const currentUser = req.user;
        const createDto = req.body;
        const promise = this.service.createTeammateRecordRepo(createDto, currentUser);
        this.respondPromise(promise, res, next);
    };

}
