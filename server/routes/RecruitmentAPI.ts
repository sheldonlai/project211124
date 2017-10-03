import {BaseAPI} from "./BaseAPI";
import {IRecruitmentService} from "../services/RecruitmentService";
import {NextFunction, Response, Router} from "express";
import {AuthRequest, maybeAuthenticated, mustBeAuthenticated} from "../middlewares/AuthMiddleware";
import {APIUrls} from "../urls";
import {User} from "../models/User";
import {RecruitmentDto} from "../dtos/recruitment/RecruitmentDto";

export class RecruitmentAPI extends BaseAPI{
    private service: IRecruitmentService;
    public router: Router;

    constructor(service: IRecruitmentService){
        super();
        this.router = Router();
        this.service = service;
        this.router.get(APIUrls.fetchRecruitmentPage, maybeAuthenticated, this.fetchRecruitmentPage);
        this.router.post(APIUrls.createRecruitment, mustBeAuthenticated, this.createRecruitment);
    }

    public createRecruitment = (req: AuthRequest, res: Response, next: NextFunction) => {
        let recruitment: RecruitmentDto = req.body;
        let user: User = req.user;
        let result = this.service.createRecruitment(recruitment, user);
        this.respondPromise(result, res, next);
    };

    public fetchRecruitmentPage = (req: AuthRequest, res: Response, next: NextFunction) => {
        let recruitmentId: string = req.params.id;
        let user: User = req.user;
        let result = this.service.fetchRecruitmentPage(recruitmentId);
        this.respondPromise(result, res, next);
    }
}

