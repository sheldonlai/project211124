import {BaseAPI} from "./BaseAPI";
import {IRecruitmentService} from "../services/RecruitmentService";
import {NextFunction, Response, Router} from "express";
import {AuthRequest, maybeAuthenticated, mustBeAuthenticated} from "../middlewares/AuthMiddleware";
import {APIUrls} from "../urls";
import {User} from "../models/User";
import {RecruitmentDto} from "../dtos/recruitment/RecruitmentDto";
import {RecruitmentCommentDto} from "../dtos/recruitment/RecruitmentCommenDto";
import {UserDto} from "../dtos/auth/UserDto";

export class RecruitmentAPI extends BaseAPI{
    private service: IRecruitmentService;
    public router: Router;

    constructor(service: IRecruitmentService){
        super();
        this.router = Router();
        this.service = service;
        this.router.get(APIUrls.fetchRecruitmentPage, maybeAuthenticated, this.fetchRecruitmentPage);
        this.router.post(APIUrls.createRecruitment, mustBeAuthenticated, this.createRecruitment);
        this.router.post(APIUrls.addRecruitmentComment, mustBeAuthenticated, this.addRecruitmentComment);
        this.router.put(APIUrls.updateRecruitmentComment, mustBeAuthenticated, this.updateRecruitmentComment);
        this.router.put(APIUrls.recruitMember, mustBeAuthenticated, this.recruitMember);
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
    };

    public addRecruitmentComment = (req: AuthRequest, res: Response, next: NextFunction) => {
        let comment: RecruitmentCommentDto = req.body.comment;
        let recruitmentId: string = req.body.recruitmentId;
        let user: User = req.user;
        let result = this.service.addRecruitmentComment(comment, recruitmentId, user);
        this.respondPromise(result, res, next);
    };

    public updateRecruitmentComment = (req: AuthRequest, res: Response, next: NextFunction) => {
        let comment: RecruitmentCommentDto = req.body.comment;
        let recruitmentId: string = req.body.recruitmentId;
        let user: User = req.user;
        let result = this.service.updateRecruitmentComment(comment, recruitmentId, user);
        this.respondPromise(result, res, next);
    };

    public recruitMember = (req: AuthRequest, res: Response, next: NextFunction) => {
        let member: UserDto = req.body.member;
        let recruitmentId: string = req.body.recruitmentId;
        let user: User = req.user;
        let result = this.service.recruitMember(member, recruitmentId, user);
        this.respondPromise(result, res, next);
    }
}

