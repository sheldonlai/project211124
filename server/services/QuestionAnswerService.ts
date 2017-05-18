import {injectable, inject} from "inversify";
import {IQuestionAnswerRepository} from "../respositories/QuestionAnswerRepository";
import TYPES from '../enums/ClassTypes';

export interface IQuestionAnswerService{
    createQuestion(question: any, user: any): Promise<any>;
}

@injectable()
export class QuestionAnswerService implements IQuestionAnswerService{

    private questionsAnswerRepository : IQuestionAnswerRepository;

    constructor(
        @inject(TYPES.IQARepo)  questionsAnswerRepository : IQuestionAnswerRepository
    ){
        this.questionsAnswerRepository = questionsAnswerRepository;
    }

    createQuestion(question: any, user: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
}
