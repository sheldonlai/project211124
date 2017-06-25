import {IQuestionRepository} from "../repositories/QuestionRepository";
import {IAnswerRepository} from "../repositories/AnswerRepository";
import {QuestionDto} from "../dtos/q&a/QuestionDto";
import {AnswerDto} from "../dtos/q&a/AnswerDto";
import {Question} from "../models/Question";
import {User} from "../models/User";
import {QuestionPageDto} from "../dtos/q&a/QuestionPageDto";
import {Answer} from "../models/Answer";
import {AppError} from "../errors/AppError";
import {BaseService} from "./BaseService";
import {QuestionPreviewDto} from "../dtos/q&a/QuestionPreviewDto";
import {ClientError} from "../errors/HttpStatus";

export interface IAnswerService {
    createAnswer(user : User, answer: AnswerDto): Promise<AnswerDto>;
    updateAnswer(user : User, answer: AnswerDto): Promise<AnswerDto>;
}

export class AnswerService extends BaseService implements IAnswerService{
    private answerRepository: IAnswerRepository;

    constructor(answerRepository : IAnswerRepository){
        super();

        this.answerRepository = answerRepository;
    }

    createAnswer(current_user : User, new_answer: AnswerDto): Promise<AnswerDto>{
        let answerObj = new Answer(
            new_answer.question, new_answer.content, current_user
        );

        return this.answerRepository.create(answerObj);
    }

    updateAnswer(current_user: User, updated_answer: AnswerDto): Promise<AnswerDto>{
        return this.answerRepository.getById(updated_answer._id).then((answer_found: Answer) => {
            this.checkPermissionForModification(updated_answer, answer_found, current_user);

            //filter out non-modifiable fields
            delete updated_answer.author;
            delete updated_answer.upVotes;
            delete updated_answer.downVotes;
            delete updated_answer.createdUtc;
            delete updated_answer.question;
            delete updated_answer.comments;

            updated_answer.lastEditedUtc = new Date(Date.now());
            answer_found = this.mapKeysOntoObject(answer_found, updated_answer);

            return this.answerRepository.update(answer_found);
        });
    }

    private checkPermissionForModification = (answer_by_user: AnswerDto, answer_found_in_db: Answer, currentUser: User) => {
        if(answer_by_user._id != currentUser._id){
            throw new AppError("You are not the owner of this answer");
        }
        return true;
    }
};

export interface IQuestionService {
    getQuestionPreview(user? : User): Promise<QuestionPreviewDto>;
    createQuestion(question: QuestionDto, user: User): Promise<QuestionDto>;
    getQuestionPageByTitle(name: string): Promise<QuestionPageDto>;
    getUserQuestions(currentUser: User): Promise<QuestionDto[]>;
    updateQuestion(question: QuestionDto, user: User): Promise<QuestionDto>;
};

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
        promises.push(this.questionRepository.getAll({sort: "-createdUtc", limit: 25 }))
        if (user) {
            promises.push((this.questionRepository.getQuestionsByAuthor(user)));
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

    getQuestionPageByTitle(name: string): Promise<QuestionPageDto> {
        let questionPage: QuestionPageDto = {
            question: null,
            answers: []
        };
        return this.questionRepository.getQuestionByTitle(name).then((question: Question) => {
            questionPage.question = question;
            return this.answerRepository.getByQuestionId(question._id);
        }).then((answers: Answer[]) => {
            questionPage.answers = answers ? answers : [];
            return questionPage;
        });
    }

    getUserQuestions(currentUser: User): Promise<QuestionDto[]> {
        return this.questionRepository.getQuestionsByAuthor(currentUser).then((questions: Question[]) => {
            return questions;
        });

    }

    updateQuestion(questionDto: QuestionDto, user: User): Promise<QuestionDto> {
        return this.questionRepository.getById(questionDto._id).then((questionObj: Question) => {
            this.checkPermissionForModification(questionDto, questionObj, user);
            // do not allow user to change these
            let restrictedDto: QuestionDto = this.applyUpdateRestrictions(questionDto, questionObj);
            // update last edited utc
            restrictedDto.lastEditedUtc = new Date(Date.now());
            questionObj = this.mapKeysOntoObject(questionObj, restrictedDto);

            return this.questionRepository.update(questionObj);
        })
    }

    private checkPermissionForModification = (questionDto: QuestionDto, questionObj: Question, currentUser: User) => {
        if (questionObj.author._id != currentUser._id) {
            throw new AppError("You are not the owner of this question!")
        }
        if (currentUser.username != questionDto.author.username) {
            throw new AppError("You cannot change the username of the author")
        }
        return true;
    };

    protected applyUpdateRestrictions(questionDto: QuestionDto, questionInDB: Question): QuestionDto {
        delete questionDto._id;
        delete questionDto.author;
        delete questionDto.createdUtc;
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

