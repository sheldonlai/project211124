import {NextFunction, Router, Response, Request} from "express";
import {Urls} from "../../common/urls";
import {Container} from "inversify";
import {IQuestionAnswerService} from "../services/QuestionAnswerService";
import TYPES from "../enums/ClassTypes";

export class QuestionAnswerAPI {

    private service : IQuestionAnswerService;

    constructor(router: Router, service: IQuestionAnswerService) {
        this.service = service;
        router.get(Urls.CreateQuestion, this.createQuestion);

    }

    public createQuestion = (req: Request, res: Response, next: NextFunction) =>{
        this.service.createQuestion(null, null);
        res.json({'message' : 'Hello world'})
    }
}
