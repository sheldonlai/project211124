import {injectable, inject} from "inversify";
import {IQuestionRepository} from "../respositories/QuestionRepository";
import TYPES from '../enums/ClassTypes';

export interface IQuestionAnswerService{
    createQuestion(question: any, user: any): Promise<any>;
}

@injectable()
export class QuestionAnswerService implements IQuestionAnswerService{

    private questionsAnswerRepository : IQuestionRepository;

    constructor(
        @inject(TYPES.IQuestionRepo)  questionsAnswerRepository : IQuestionRepository
    ){
        this.questionsAnswerRepository = questionsAnswerRepository;
    }

    createQuestion(question: any, user: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
}
