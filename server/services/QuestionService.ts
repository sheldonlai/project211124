import {IQuestionRepository} from "../repositories/QuestionRepository";
import {IAnswerRepository} from "../repositories/AnswerRepository";
import {QuestionDto} from "../dtos/q&a/QuestionDto";
import {AnswerDto} from "../dtos/q&a/AnswerDto";
import {Question, QuestionComment} from "../models/Question";
import {User} from "../models/User";
import {QuestionPageDto} from "../dtos/q&a/QuestionPageDto";
import {Answer} from "../models/Answer";
import {AppError} from "../errors/AppError";
import {BaseService} from "./BaseService";
import {QuestionPreviewCollectionsDto} from "../dtos/q&a/QuestionPreviewCollectionsDto";
import {ClientError, HttpStatus} from "../errors/HttpStatus";
import {ITagRepository} from "../repositories/TagRepository";
import {ITag} from "../models/Tags";
import {UserQuestionVote} from "../models/UserQuestionVote";
import {CommentDto} from "../dtos/q&a/CommentDto"
import {IUserRepository} from "../repositories/UserRepository";
import {getQuestionsQueryByPreference} from "../elasticSearch/QuestionQueries";
import {UserPreferences} from "../models/UserPerferences";


export interface IQuestionService {
    getQuestionPreview(user?: User): Promise<QuestionPreviewCollectionsDto>;
    createQuestion(question: QuestionDto, user: User): Promise<QuestionDto>;
    getQuestionPageByID(name: string, user?: User): Promise<QuestionPageDto>;
    getUserQuestions(currentUser: User): Promise<QuestionDto[]>;
    updateQuestion(question: QuestionDto, user: User): Promise<QuestionDto>;
    upVoteQuestion(questionId: string, user: User): Promise<QuestionDto>;
    downVoteQuestion(questionId: string, user: User): Promise<QuestionDto>;
    createComment(question: Question): Promise<QuestionDto>;
    UpdateComment(commentIndx: number, questionId: string, user: User, updatedComment: CommentDto): Promise<QuestionDto>;
    DeleteComment(commentIndx: number, questionId: string, user: User): Promise<QuestionDto>;
}

export class QuestionService extends BaseService implements IQuestionService {
    constructor(
        private questionRepository: IQuestionRepository,
        private answerRepository: IAnswerRepository,
        private tagRepository: ITagRepository,
        private userRepository: IUserRepository,
        ) {
        super();
    }

    async getQuestionPreview(user?: User): Promise<QuestionPreviewCollectionsDto> {
        let promises = [];
        if (user) {
            let preferences = await this.userRepository.getUserPreference(user);
            preferences = preferences.question_pref?  preferences: new UserPreferences();
            promises.push(this.questionRepository.search(getQuestionsQueryByPreference(preferences)));
            promises.push((this.questionRepository.getQuestionsByAuthor(user)));
        } else {
            let preferences = new UserPreferences();
            promises.push(this.questionRepository.search(getQuestionsQueryByPreference(preferences)));
        }
        promises.push(this.questionRepository.getAll({sort: "-createdUtc", limit: 25}));

        return Promise.all(promises).then((result) => {
            return {
                featuredQuestions: result[0] ? result[0] : [],
                myQuestions: result[1] ? result[1] : []
            };
        })
    }

    createQuestion(question: QuestionDto, currentUser: User): Promise<QuestionDto> {
        return this.tagRepository.getTags(question.tags).then((tags: ITag[]) => {
            let questionObject = new Question(
                question.title, question.content, currentUser, tags,
                question.isPublished, question.publicityStatus, question.difficulty, question.category
            );
            return this.questionRepository.create(questionObject);
        })
    }

    getQuestionPageByID(id: string, user?: User): Promise<QuestionPageDto> {
        let questionPage: QuestionPageDto = {
            question: null,
            answers: []
        };
        return this.questionRepository.getById(id).then((question: Question) => {
            questionPage.question = question;
            return this.answerRepository.getByQuestionId(question._id);
        }).then((answers: Answer[]) => {
            questionPage.answers = answers ? answers : [];
            this.questionRepository.increaseViewCount(questionPage.question._id).then(() => {
                // TODO: some kind of logging
                console.log("increased view");
            });
            if (user){
                this.userRepository.updateQuestionVector(user, questionPage.question).then(() => {
                    // TODO: some kind of logging
                    console.log("Updated Question Vector");
                });
            }
            return questionPage;
        });
    }

    getUserQuestions(currentUser: User): Promise<QuestionDto[]> {
        return this.questionRepository.getQuestionsByAuthor(currentUser).then((questions: Question[]) => {
            return questions;
        });

    }

    updateQuestion(questionDto: QuestionDto, user: User): Promise<QuestionDto> {
        return this.questionRepository.getById(questionDto._id).then((questionFound: Question) => {
            this.checkPermissionForModification(questionDto, questionFound, user);

            // editable fields
            questionFound.content = questionDto.content;
            questionFound.title = questionDto.title;
            questionFound.publicityStatus = questionDto.publicityStatus;
            questionFound.difficulty = questionDto.difficulty;
            questionFound.category = questionDto.category;

            // update last edited utc
            questionFound.lastEditedUtc = new Date(Date.now());

            return this.questionRepository.update(questionFound)
                .then((question)=> this.questionRepository.getById(question._id));
        });
    }

    upVoteQuestion(questionId: string, user: User): Promise<QuestionDto> {
        return this.voteHelper(questionId, user, true);
    }

    downVoteQuestion(questionId: string, user: User): Promise<QuestionDto> {
        return this.voteHelper(questionId, user, false);
    }

    voteHelper(questionId: string, user: User, up: boolean) {
        let vote = new UserQuestionVote(user._id, questionId, up);
        return this.questionRepository.findOneAndUpdateVoteQuestion(vote).then((question: Question)  => {
            return question;
        });
    }

    createComment(question: Question){
        return this.questionRepository.getById(question._id).then((questionFound: Question) => {
            questionFound.comments = question.comments;
            return this.questionRepository.update(questionFound).then((questionFound: Question) => {
                return this.questionRepository.getById(questionFound._id);
            });
        });
    }

    UpdateComment(commentIndx: number, questionId: string, user: User, updatedComment: CommentDto){
        return this.questionRepository.getById(questionId).then((questionFound: Question) => {
            if(questionFound.comments[commentIndx].commentBy.username != user.username ||
            !questionFound.comments[commentIndx].commentBy._id.equals(user._id)){
                throw new AppError("You are not the owner of this question!", ClientError.UNAUTHORIZED);
            }
            else{
                questionFound.comments[commentIndx] = updatedComment;
                return this.questionRepository.update(questionFound);
            }
        })
    }

    DeleteComment(commentIndx: number, questionId: string, user: User){
        return this.questionRepository.getById(questionId).then((questionFound: Question) => {
            if(questionFound.comments[commentIndx].commentBy.username != user.username ||
                !questionFound.comments[commentIndx].commentBy._id.equals(user._id)){
                throw new AppError("You are not the owner of this question!", ClientError.UNAUTHORIZED);
            }
            else{
                questionFound.comments.splice(commentIndx, 1);
                return this.questionRepository.update(questionFound);
            }
        })
    }

    private checkPermissionForModification = (questionDto: QuestionDto, questionObj: Question, currentUser: User) => {
        if (questionObj.author._id.toString() != currentUser._id.toString()) {
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

