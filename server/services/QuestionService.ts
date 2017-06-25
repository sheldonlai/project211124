import {IQuestionRepository} from "../repositories/QuestionRepository";
import {IAnswerRepository} from "../repositories/AnswerRepository";
import {QuestionDto} from "../dtos/q&a/QuestionDto";
import {Question} from "../models/Question";
import {User} from "../models/User";
import {QuestionPageDto} from "../dtos/q&a/QuestionPageDto";
import {Answer} from "../models/Answer";
import {AppError} from "../errors/AppError";
import {BaseService} from "./BaseService";
import {QuestionPreviewDto} from "../dtos/q&a/QuestionPreviewDto";
import {ClientError} from "../errors/HttpStatus";

export interface IQuestionService {
    getQuestionPreview(user? : User): Promise<QuestionPreviewDto>;
    createQuestion(question: QuestionDto, user: User): Promise<QuestionDto>;
    getQuestionPageById(id: string): Promise<QuestionPageDto>;
    getUserQuestions(currentUser: User): Promise<QuestionDto[]>;
    updateQuestion(question: QuestionDto, user: User): Promise<QuestionDto>;
}

export class QuestionService extends BaseService implements IQuestionService {

    private questionRepository: IQuestionRepository;
    private answerRepository: IAnswerRepository;

    constructor(questionRepository: IQuestionRepository,
                answerRepository: IAnswerRepository) {
        super();
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
    }

    getQuestionPreview(user? : User): Promise<QuestionPreviewDto>{
        let promises = [];
        promises.push(this.questionRepository.getAll({sort: "-dateCreated", limit: 25 }))
        if (user) {
            promises.push((this.questionRepository.getQuestionByAuthor(user)));
        }
        return Promise.all(promises).then((result)=> {
            return {
                featuredQuestions: result[0]? result[0] : [],
                myQuestions: result[1]? result[1] : []
            };
        })
    }

    createQuestion(question: QuestionDto, currentUser: User): Promise<QuestionDto> {
        let questionObject = new Question(
            question.title, question.content, currentUser, question.tags,
            question.isPublished, question.publicityStatus
        );
        return this.questionRepository.create(questionObject);
    }

    getQuestionPageById(id: string): Promise<QuestionPageDto> {
        let questionPage: QuestionPageDto = {
            question: null,
            answers: []
        };
        return this.questionRepository.getById(id).then((question: Question) => {
            questionPage.question = question;
            return this.answerRepository.getByQuestionId(question._id);
        }).then((answers: Answer[]) => {
            questionPage.answers = answers ? answers : [];
            return questionPage;
        });
    }

    getUserQuestions(currentUser: User): Promise<QuestionDto[]> {
        return this.questionRepository.getQuestionByAuthor(currentUser).then((questions: Question[]) => {
            return questions;
        });

    }

    updateQuestion(questionDto: QuestionDto, user: User): Promise<QuestionDto> {
        return this.questionRepository.getById(questionDto._id).then((questionObj: Question) => {
            this.checkPermissionForModification(questionDto, questionObj, user);
            let restrictedDto: QuestionDto = this.applyUpdateRestrictions(questionDto, questionObj);

            // update last edited utc
            restrictedDto.lastEditedUtc = new Date(Date.now());
            questionObj = this.mapKeysOntoObject(questionObj, restrictedDto);

            return this.questionRepository.update(questionObj);
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
    };

    protected applyUpdateRestrictions(questionDto: QuestionDto, questionInDB: Question): QuestionDto {
        delete questionDto._id;
        delete questionDto.author;
        delete questionDto.dateCreated;
        if (questionDto.isPublished) {
            delete questionDto.isPublished
        }
        if (questionDto.publicityStatus !== questionInDB.publicityStatus) {
            throw new AppError("You cannot change the publicity status", ClientError.BAD_REQUEST)
        }
        delete questionDto.publicityStatus;
        return questionDto;
    }

}
