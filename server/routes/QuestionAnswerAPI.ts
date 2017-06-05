import {NextFunction, Request, Response, Router} from "express";
import {APIUrls} from "../../common/urls";
import {IQuestionAnswerService} from "../services/QuestionAnswerService";
import {BaseAPI} from "./BaseAPI";

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
