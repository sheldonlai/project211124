import {NextFunction, Response, Router} from "express";
import {BaseAPI} from "./BaseAPI";
import {APIUrls} from "../urls";
import {IAdminService} from "../services/AdminService";
import {AuthRequest, mustBeAdministrator, mustBeAuthenticated} from "../middlewares/AuthMiddleware";

export class AdminAPI extends BaseAPI {

    private service : IAdminService;
    public router: Router;

    constructor(service: IAdminService) {
        super();
        this.router = Router();
        this.service = service;
        this.router.post(APIUrls.SetDashboardSettings, mustBeAdministrator, this.setAdminDashboardSettings);
        this.router.get(APIUrls.GetDashboardSettings, mustBeAdministrator, this.getAdminDashboardSettings);
    }


    setAdminDashboardSettings = (req: AuthRequest, res: Response, next: NextFunction) => {
        let json = req.body;
        let user = req.user;
        let promise = this.service.setDashboardView(json, user);
        this.respondPromise(promise, res, next);
    };

    getAdminDashboardSettings = (req: AuthRequest, res: Response, next: NextFunction) => {
        let user = req.user;
        let promise = this.service.getDashboardView(user);
        this.respondPromise(promise, res, next);
    };
}
