import {NextFunction, Request, Response, Router} from "express";
import {BaseAPI} from "./BaseAPI";
import {APIUrls} from "../urls";
import {ILocationService} from "../services/LocationService";
import {IUserService} from "../services/UserService";
import {AuthRequest, maybeAuthenticated, mustBeAuthenticated} from "../middlewares/AuthMiddleware";
import {ITeammateRecordService} from "../services/TeammateRecordService";
import {TeammateRatingDto} from "../dtos/rating/TeammateRatingDto";

export class TeammateRatingAPI extends BaseAPI {

    private service : ITeammateRecordService;
    public router: Router;
    constructor(service: ITeammateRecordService) {
        super();
        this.router = Router();
        this.service = service;
        this.router.post(APIUrls.createTeammateRecord, mustBeAuthenticated, this.createTeammateRecord);
        this.router.get(APIUrls.getTeammateRecordPreview, maybeAuthenticated, this.getTeammateRecordPreview);
        this.router.get(APIUrls.getTeammateRecord, this.getTeammateRecord);
        this.router.post(APIUrls.addRating, mustBeAuthenticated, this.addTeammateRating);
        this.router.put(APIUrls.editRating, mustBeAuthenticated, this.editTeammateRating);

    }

    public createTeammateRecord = (req: AuthRequest, res: Response, next: NextFunction) => {
        const currentUser = req.user;
        const createDto = req.body;
        const promise = this.service.createTeammateRecordRepo(createDto, currentUser);
        this.respondPromise(promise, res, next);
    };

    public getTeammateRecordPreview = (req: AuthRequest, res: Response, next: NextFunction) => {
        const currentUser = req.user;
        const promise = this.service.getRecentTeammateRecordPreview(currentUser);
        this.respondPromise(promise, res, next);
    };

    public getTeammateRecord = (req: Request, res: Response, next: NextFunction) => {
        const teammateRecordId = req.params.id;
        const promise = this.service.getTeammateRecord(teammateRecordId);
        this.respondPromise(promise, res, next);
    };

    public addTeammateRating = (req: AuthRequest, res: Response, next: NextFunction) => {
        const teammateRecordId = req.params.id;
        const currentUser = req.user;
        const createDto = req.body;
        const promise = this.service.addRating(createDto, teammateRecordId, currentUser);
        this.respondPromise(promise, res, next);
    };

    public editTeammateRating = (req: AuthRequest, res: Response, next: NextFunction) => {
        const teammateRecordId = req.params.id;
        const currentUser = req.user;
        const createDto = req.body;
        const promise = this.service.editRating(createDto,teammateRecordId, currentUser);
        this.respondPromise(promise, res, next);
    };

}
