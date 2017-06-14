import {NextFunction, Request, Response, Router} from "express";
import {IQuestionAnswerService} from "../services/QuestionService";
import {BaseAPI} from "./BaseAPI";
import {APIUrls} from "../urls";

export class QuestionAnswerAPI extends BaseAPI {

    private service : IQuestionAnswerService;

    constructor(router: Router, service: IQuestionAnswerService) {
        super();
        this.service = service;
        router.get(APIUrls.CreateQuestion, this.createQuestion);

    }

    public createQuestion = (req: Request, res: Response, next: NextFunction) =>{
        this.service.createQuestion(null, null);
        res.json({'message' : 'Hello world'})
    }
}
