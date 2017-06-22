import {IQuestionRepository} from "../repositories/QuestionRepository";
import {IAnswerRepository} from '../repositories/AnswerRepository';
import {QuestionDto} from "../dtos/q&a/QuestionDto";
import {Question} from "../models/Question";
import {User} from "../models/User";
import {QuestionPageDto} from "../dtos/q&a/QuestionPageDto";
import {AnswerDto} from "../dtos/q&a/AnswerDto";
import {Answer} from "../models/Answer";
import {AppError} from "../errors/AppError";

export interface IQuestionAnswerService{
    createQuestion(question: QuestionDto, user: User): Promise<any>;
    getQuestionPageById(id: string): Promise<QuestionPageDto>;
    getUserQuestions(currentUser: User): Promise<QuestionDto[]>;
    updateQuestion(question: QuestionDto, user: User): Promise<QuestionDto>;
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

    createQuestion(question: QuestionDto, currentUser: User): Promise<any> {
        let questionObject = new Question(
            question.title, question.content, currentUser, question.tags,
            question.isPublished, question.publicityStatus
        );
        return this.questionsRepository.create(questionObject);
    }

    getQuestionPageById(id: string): Promise<QuestionPageDto> {
        let questionPage : QuestionPageDto= {
            question : null,
            answers : []
        };
        return this.questionsRepository.getById(id).then((question : Question)=> {
            questionPage.question = question;
            return this.answerRepository.getByQuestionId(question._id);
        }).then((answers: Answer[])=> {
            questionPage.answers = answers?  answers : [];
            return questionPage;
        });
    }

    getUserQuestions(currentUser: User): Promise<QuestionDto[]> {
        return this.questionsRepository.getQuestionByAuthor(currentUser).then((questions: Question[]) =>{
            return questions;
        });

    }

    updateQuestion(questionDto: QuestionDto, user: User): Promise<QuestionDto> {
        return this.questionsRepository.getById(questionDto._id).then((questionObj: Question)=> {
            if (questionObj.author != user._id) {
                throw new AppError("You are not the owner of this question!")
            }
            questionObj.publicityStatus = questionDto.publicityStatus;
            questionObj.lastEditedUtc = new Date(Date.now());
            questionObj.content = questionDto.content;
            questionObj.tags = questionDto.tags;

            //TODO: error check for other fields and out a error if they are changed
            return this.questionsRepository.update(questionObj);
        })
    }


}
