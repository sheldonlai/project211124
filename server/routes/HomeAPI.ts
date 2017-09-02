
import { NextFunction, Request, Response, Router } from "express";
import {APIUrls} from "../urls";
import {BaseAPI} from "./BaseAPI";
import {IDashboardService} from "../services/DashboardService";



export class HomeAPI extends BaseAPI{
    public router: Router;
    constructor(
        private dashboardService: IDashboardService,
    ) {
        super();
        this.router = Router();
        this.router.get(APIUrls.MainPage, this.homeData);
        this.router.get(APIUrls.FetchDashboard, this.DashboardData);
    }

    public homeData = (req: Request, res: Response, next: NextFunction) =>{
        res.json({'message' : 'Hello world'})
    };

    public DashboardData = (req: Request, res: Response, next: NextFunction) =>{
        let promise = this.dashboardService.getHottestStoriesAndQuestions();
        this.respondPromise(promise, res, next);
    };
}
