import {IQuestion, Question, QuestionComment, QuestionModel} from "../models/Question";
import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {IUser, User} from "../models/User";
import {UserQuestionVote, UserQuestionVoteModel} from "../models/UserQuestionVote";
import {isNullOrUndefined} from "util";
import {AppError} from "../errors/AppError";
import {ClientError} from "../errors/HttpStatus";
import {removeUserRestrictedInfo} from "../utils/UserUtils";
import {Tag} from "../models/Tags";

export interface IQuestionRepository extends IBaseRepository<Question> {
    getQuestionsByAuthor(user: User): Promise<Question[]>;
    getQuestionByTitle(title: string): Promise<Question>;
    findOneAndUpdateVoteQuestion(userQuestionVote: UserQuestionVote): Promise<Question>;
    increaseViewCount(questionId: any) :Promise<any>
}

export class QuestionRepository extends BaseRepository<Question, IQuestion> implements IQuestionRepository {
    constructor() {
        super(QuestionModel);
    }

    create(question: Question): Promise<Question> {
        delete question.createdUtc;
        question.lastEditedUtc = undefined;
        return super.create(question).then((question: Question) => {
            return this.getById(question._id);
        });
    }

    update(question: Question): Promise<Question> {
        delete question.createdUtc;
        return super.update(question);
    }

    getQuestionByTitle(title: string): Promise<Question> {
        return QuestionModel.findOne({title: title}).lean().exec()
            .then((question: Question) => this.applyAdditionalFunction(question))
            .then((question: Question) => {
                return this.getModel(question);
            });
    }

    getQuestionsByAuthor(user: User): Promise<Question[]> {
        return QuestionModel.find({author: user._id}).lean().exec()
            .then((questions: Question[]) => Promise.all(questions.map((q) => this.applyAdditionalFunction(q))))
            .then((question: Question[]) => {
                return this.getModels(question);
            });
    }

    findOneAndUpdateVoteQuestion(userQuestionVote: UserQuestionVote): Promise<Question> {
        return UserQuestionVoteModel.findOneAndUpdate(
            {user: userQuestionVote.user, question: userQuestionVote.question},
            userQuestionVote, {upsert: true}).then((obj: UserQuestionVote) => {
            return this.getById(userQuestionVote.question);
        });
    }

    increaseViewCount(questionId: any) :Promise<any> {
        return QuestionModel.findByIdAndUpdate(questionId,{$inc: {views:1}}).then(() => undefined);
    }

    protected applyRestriction(question: Question): Question {
        removeUserRestrictedInfo(question.author);
        question.comments = question.comments.map((comment: QuestionComment) => {
            removeUserRestrictedInfo(comment.commentBy);
            return comment;
        });
        return question;
    }


    protected applyAdditionalFunction(question: Question): Promise<Question> {
        if (isNullOrUndefined(question)){
            throw new AppError("Cannot find the specified question", ClientError.BAD_REQUEST)
        }
        question.tags = <any>question.tags.map(q => q.tag);
        return UserQuestionVoteModel.find({question: question}).lean().exec()
            .then((userVote: UserQuestionVote[]) => {
                const upVote = userVote.filter((userVote) => userVote.upVote == true).length;
                const downVote = userVote.length - upVote;
                question.upVotes = upVote;
                question.downVotes = downVote;
                return question;
            });
    }
}
