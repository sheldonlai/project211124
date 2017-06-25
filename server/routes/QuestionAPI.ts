import {NextFunction, Request, Response, Router} from "express";
import {IQuestionService} from "../services/QuestionService";
import {BaseAPI} from "./BaseAPI";
import {APIUrls} from "../urls";
import {AuthRequest, maybeAuthenticated, mustBeAuthenticated} from "../middlewares/AuthMiddleware";
import {QuestionDto} from "../dtos/q&a/QuestionDto";
import {User} from "../models/User";

export class QuestionAPI extends BaseAPI {

    private service : IQuestionService;

    constructor(router: Router, service: IQuestionService) {
        super();
        this.service = service;
        router.get(APIUrls.QuestionPreviews, maybeAuthenticated, this.getQuestionPreviews);
        router.post(APIUrls.CreateQuestion, mustBeAuthenticated, this.createQuestion);
        router.get(APIUrls.GetQuestionPage, maybeAuthenticated, this.getQuestion);
        router.put(APIUrls.UpdateQuestion, mustBeAuthenticated, this.updateQuestion);
    }

    public getQuestionPreviews = (req: AuthRequest, res: Response, next: NextFunction) => {
        let result = this.service.getQuestionPreview(req.user);
        this.respondPromise(result, res, next);
    }

    public createQuestion = (req: AuthRequest, res: Response, next: NextFunction) =>{
        let question: QuestionDto = req.body;
        let user : User = req.user;
        let result = this.service.createQuestion(question, user);
        this.respondPromise(result, res, next);
    }

    public getQuestion = (req: AuthRequest, res: Response, next: NextFunction) => {
        let title = req.params.title;
        let result = this.service.getQuestionPageByTitle(title);
        this.respondPromise(result, res, next);
    }

    public updateQuestion = (req: AuthRequest, res: Response, next: NextFunction) => {
        let question: QuestionDto = req.body;
        let user : User = req.user;
        let result = this.service.updateQuestion(question, user);
        this.respondPromise(result, res, next);
    }

}
