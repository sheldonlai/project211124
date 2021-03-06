import {BaseAPI} from "./BaseAPI";
import {IRecruitmentService} from "../services/RecruitmentService";
import {NextFunction, Response, Router} from "express";
import {AuthRequest, maybeAuthenticated, mustBeAuthenticated} from "../middlewares/AuthMiddleware";
import {APIUrls} from "../urls";
import {User} from "../models/User";
import {RecruitmentDto, RecruitmentRequestDto} from "../dtos/recruitment/RecruitmentDto";
import {RecruitmentCommentDto} from "../dtos/recruitment/RecruitmentCommenDto";
import {UserDto} from "../dtos/auth/UserDto";
import {IRecruitmentRecordsService} from "../services/RecruitmentRecordsService";
import {RecruitmentRecordEntityDto} from "../dtos/recruitment/RecruitmentRecordsDto";

export class RecruitmentAPI extends BaseAPI{
    private service: IRecruitmentService;
    private recordService: IRecruitmentRecordsService;
    public router: Router;

    constructor(service: IRecruitmentService, recordService: IRecruitmentRecordsService){
        super();
        this.router = Router();
        this.service = service;
        this.recordService = recordService;
        this.router.get(APIUrls.fetchRecruitmentPage, maybeAuthenticated, this.fetchRecruitmentPage);
        this.router.post(APIUrls.createRecruitment, mustBeAuthenticated, this.createRecruitment);
        this.router.post(APIUrls.addRecruitmentComment, mustBeAuthenticated, this.addRecruitmentComment);
        this.router.put(APIUrls.updateRecruitmentComment, mustBeAuthenticated, this.updateRecruitmentComment);
        this.router.put(APIUrls.recruitMember, mustBeAuthenticated, this.recruitMember);
        this.router.get(APIUrls.getRecruitmentPreviews, maybeAuthenticated, this.getRecruitmentPreviews);
        this.router.put(APIUrls.editRecruitment, mustBeAuthenticated, this.editRecruitment);
        this.router.put(APIUrls.joinRecruitment, mustBeAuthenticated, this.joinRecruitment);
        this.router.get(APIUrls.getRecruitmentRecords, mustBeAuthenticated, this.getRecruitmentRecords);
        this.router.put(APIUrls.addRecruitmentRecord, mustBeAuthenticated, this.addRecruitmentRecord);
        this.router.put(APIUrls.updateRecruitmentRequest, mustBeAuthenticated, this.updateRecruitmentRequest);
        this.router.put(APIUrls.updateRecruitmentRecord, mustBeAuthenticated, this.updateRecruitmentRecord);
    }

    public getRecruitmentPreviews = (req: AuthRequest, res: Response, next: NextFunction) => {
        let user: User = req.user;
        let result = this.service.getRecruitmentPreviews(user);
        this.respondPromise(result, res, next);
    };

    public createRecruitment = (req: AuthRequest, res: Response, next: NextFunction) => {
        let recruitment: RecruitmentDto = req.body;
        let user: User = req.user;
        let result = this.service.createRecruitment(recruitment, user);
        this.respondPromise(result, res, next);
    };

    public fetchRecruitmentPage = (req: AuthRequest, res: Response, next: NextFunction) => {
        let recruitmentId: string = req.params.id;
        let user: User = req.user;
        let result = this.service.fetchRecruitmentPage(recruitmentId, user);
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
    };

    public editRecruitment = (req: AuthRequest, res: Response, next: NextFunction) => {
        let updatedRecruitment: RecruitmentDto = req.body;
        let user: User = req.user;
        let result = this.service.editRecruitment(updatedRecruitment, user);
        this.respondPromise(result, res, next);
    };

    public joinRecruitment = (req: AuthRequest, res: Response, next: NextFunction) => {
        let request: RecruitmentRequestDto = req.body.request;
        let recruitmentId: string = req.body.recruitmentId;
        let user: User = req.user;
        let result = this.service.joinRecruitment(request, recruitmentId, user);
        this.respondPromise(result, res, next);
    };

    public getRecruitmentRecords = (req: AuthRequest, res: Response, next: NextFunction) => {
        let user: User = req.user;
        let result = this.recordService.getRecruitmentRecords(user);
        this.respondPromise(result, res, next);
    };

    public addRecruitmentRecord = (req: AuthRequest, res: Response, next: NextFunction) => {
        let record: RecruitmentRecordEntityDto = req.body.record;
        let recordsId: string = req.body.recordsId;
        let user: User = req.user;
        let result = this.recordService.addRecruitmentRecord(record, recordsId);
        this.respondPromise(result, res, next);
    };

    public updateRecruitmentRequest = (req: AuthRequest, res: Response, next: NextFunction) => {
        let request: RecruitmentRequestDto = req.body.request;
        let recruitmentId: string = req.body.recruitmentId;
        let accepted: boolean = req.body.accepted;
        let user: User = req.user;
        let result = this.service.updateRecruitmentRequest(request, recruitmentId, user, accepted);
        this.respondPromise(result, res, next);
    };

    public updateRecruitmentRecord = (req: AuthRequest, res: Response, next: NextFunction) => {
        let recruitmentId: string = req.body.recruitmentId;
        let member: User = req.body.member;
        let accepted: boolean = req.body.accepted;
        let result = this.recordService.updateRecruitmentRecord(recruitmentId, member, accepted);
        this.respondPromise(result, res, next);
    }
}

