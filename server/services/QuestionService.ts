import {IQuestionRepository} from "../repositories/QuestionRepository";
import {IAnswerRepository} from "../repositories/AnswerRepository";
import {QuestionDto} from "../dtos/q&a/QuestionDto";
import {Question} from "../models/Question";
import {User} from "../models/User";
import {QuestionPageDto} from "../dtos/q&a/QuestionPageDto";
import {Answer} from "../models/Answer";
import {AppError} from "../errors/AppError";
import {BaseService} from "./BaseService";

export interface IQuestionAnswerService {
    createQuestion(question: QuestionDto, user: User): Promise<any>;
    getQuestionPageById(id: string): Promise<QuestionPageDto>;
    getUserQuestions(currentUser: User): Promise<QuestionDto[]>;
    updateQuestion(question: QuestionDto, user: User): Promise<QuestionDto>;
}

export class QuestionService extends BaseService implements IQuestionAnswerService {

    private questionsRepository: IQuestionRepository;
    private answerRepository: IAnswerRepository;

    constructor(questionRepository: IQuestionRepository,
                answerRepository: IAnswerRepository) {
        super();
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
        let questionPage: QuestionPageDto = {
            question: null,
            answers: []
        };
        return this.questionsRepository.getById(id).then((question: Question) => {
            questionPage.question = question;
            return this.answerRepository.getByQuestionId(question._id);
        }).then((answers: Answer[]) => {
            questionPage.answers = answers ? answers : [];
            return questionPage;
        });
    }

    getUserQuestions(currentUser: User): Promise<QuestionDto[]> {
        return this.questionsRepository.getQuestionByAuthor(currentUser).then((questions: Question[]) => {
            return questions;
        });

    }

    updateQuestion(questionDto: QuestionDto, user: User): Promise<QuestionDto> {
        return this.questionsRepository.getById(questionDto._id).then((questionObj: Question) => {
            this.checkPermissionForModification(questionDto, questionObj, user);
            // do not allow user to change these
            delete questionDto.title;
            delete questionDto.author;
            delete questionDto.publicityStatus;
            delete questionDto.dateCreated;
            //TODO: error check for other fields and send a error or log if they are changed

            // question cannot change back into a draft
            if (questionDto.isPublished) {
                delete questionDto.isPublished
            }

            // update last edited utc
            questionDto.lastEditedUtc = new Date(Date.now());
            questionObj = this.mapKeysOntoObject(questionObj, questionDto);

            return this.questionsRepository.update(questionObj);
        })
    }

    private checkPermissionForModification = (questionDto: QuestionDto, questionObj: Question, currentUser: User) => {
        if (questionObj.author != currentUser._id) {
            throw new AppError("You are not the owner of this question!")
        }
        if (currentUser.name != questionDto.author) {
            throw new AppError("You cannot change the name of the author")
        }
        return true;
    }


}
