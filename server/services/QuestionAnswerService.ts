import {injectable, inject} from "inversify";
import {IQuestionRepository} from "../repositories/QuestionRepository";
import TYPES from '../enums/ClassTypes';
import {IAnswerRepository} from '../repositories/AnswerRepository';

export interface IQuestionAnswerService{
    createQuestion(question: any, user: any): Promise<any>;
}

@injectable()
export class QuestionAnswerService implements IQuestionAnswerService{

    private questionsRepository : IQuestionRepository;
    private answerRepository: IAnswerRepository;

    constructor(
        @inject(TYPES.IQuestionRepo)  questionRepository : IQuestionRepository,
        @inject(TYPES.IAnswerRepo)  answerRepository : IAnswerRepository
    ){
        this.questionsRepository = questionRepository;
        this.answerRepository = answerRepository;
    }

    createQuestion(question: any, user: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
}
