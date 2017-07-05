
import {AnswerDto} from "../dtos/q&a/AnswerDto";
import {User} from "../models/User";
import {BaseService} from "./BaseService";
import {IAnswerRepository} from "../repositories/AnswerRepository";
import {Answer} from "../models/Answer";
import {AppError} from "../errors/AppError";

export interface IAnswerService {
    createAnswer(user: User, answer: AnswerDto): Promise<AnswerDto>;
    updateAnswer(user: User, answer: AnswerDto): Promise<AnswerDto>;
    upVoteAnswer(user: User, answerId: string): Promise<AnswerDto>;
    downVoteAnswer(user: User, answerId: string): Promise<AnswerDto>;
}

export class AnswerService extends BaseService implements IAnswerService {

    private answerRepository: IAnswerRepository;

    constructor(answerRepository: IAnswerRepository) {
        super();

        this.answerRepository = answerRepository;
    }

    createAnswer(currentUser: User, newAnswer: AnswerDto): Promise<AnswerDto> {
        let answerObj = new Answer(
            newAnswer.question, newAnswer.content, currentUser
        );

        return this.answerRepository.create(answerObj);
    }

    updateAnswer(currentUser: User, updatedAnswer: AnswerDto): Promise<AnswerDto> {
        return this.answerRepository.getById(updatedAnswer._id).then((answerFound: Answer) => {
            this.checkPermissionForModification(updatedAnswer, answerFound, currentUser);

            //filter out non-modifiable fields
            delete updatedAnswer.author;
            delete updatedAnswer.upVotes;
            delete updatedAnswer.downVotes;
            delete updatedAnswer.createdUtc;
            delete updatedAnswer.question;
            delete updatedAnswer.comments;

            updatedAnswer.lastEditedUtc = new Date(Date.now());
            answerFound = this.mapKeysOntoObject(answerFound, updatedAnswer);

            return this.answerRepository.update(answerFound)
                .then((answer)=> this.answerRepository.getById(answer._id));
        });
    }

    upVoteAnswer(user: User, answerId: string): Promise<AnswerDto> {
        return undefined;
    }

    downVoteAnswer(user: User, answerId: string): Promise<AnswerDto> {
        return undefined;
    }

    private checkPermissionForModification = (answerByUser: AnswerDto, answerFoundInDb: Answer, currentUser: User) => {
        if (answerByUser.author._id.toString() != currentUser._id.toString()) {
            throw new AppError("You are not the owner of this answer");
        }
        return true;
    }
}