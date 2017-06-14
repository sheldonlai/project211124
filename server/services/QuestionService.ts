import {IQuestionRepository} from "../repositories/QuestionRepository";
import {IAnswerRepository} from '../repositories/AnswerRepository';

export interface IQuestionAnswerService{
    createQuestion(question: any, user: any): Promise<any>;
}

export class QuestionService implements IQuestionAnswerService{

    private questionsRepository : IQuestionRepository;
    private answerRepository: IAnswerRepository;

    constructor(
        questionRepository : IQuestionRepository,
        answerRepository : IAnswerRepository
    ){
        this.questionsRepository = questionRepository;
        this.answerRepository = answerRepository;
    }

    createQuestion(question: any, user: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
}
