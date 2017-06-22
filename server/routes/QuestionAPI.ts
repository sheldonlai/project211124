import {NextFunction, Request, Response, Router} from "express";
import {IQuestionAnswerService} from "../services/QuestionService";
import {BaseAPI} from "./BaseAPI";
import {APIUrls} from "../urls";
import {maybeAuthenticated, mustBeAuthenticated} from "../middlewares/AuthMiddleware";
import {QuestionDto} from "../dtos/q&a/QuestionDto";
import {User} from "../models/User";

export class QuestionAPI extends BaseAPI {

    private service : IQuestionAnswerService;

    constructor(router: Router, service: IQuestionAnswerService) {
        super();
        this.service = service;
        router.post(APIUrls.CreateQuestion, mustBeAuthenticated, this.createQuestion);
        router.get(APIUrls.GetQuestionPage, maybeAuthenticated, this.getQuestion);
        router.put(APIUrls.UpdateQuestion, mustBeAuthenticated, this.updateQuestion);
    }

    public createQuestion = (req: Request, res: Response, next: NextFunction) =>{
        let question: QuestionDto = req.body;
        let user : User = req.user;
        let result = this.service.createQuestion(question, user);
        this.respondPromise(result, res, next);
    }

    public getQuestion = (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        let result = this.service.getQuestionPageById(id);
        this.respondPromise(result, res, next);
    }

    public updateQuestion = (req: Request, res: Response, next: NextFunction) => {
        let question: QuestionDto = req.body;
        let user : User = req.user;
        let result = this.service.updateQuestion(question, user);
        this.respondPromise(result, res, next);
    }
}
