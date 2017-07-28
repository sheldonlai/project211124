import {Answer, AnswerModel, IAnswer} from "../models/Answer";
import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {Types} from "mongoose";
import {QuestionComment} from "../models/Question";
import {UserAnswerVote, UserAnswerVoteModel} from "../models/UserAnswerVote";
export interface IAnswerRepository extends IBaseRepository<Answer> {
    getByQuestionId(questionId: Types.ObjectId, sort?: any): Promise<Answer[]>;
    findOneAndUpdateVoteAnswer(userAnswerVote: UserAnswerVote): Promise<Answer>;
}

export class AnswerRepository extends BaseRepository<Answer, IAnswer> implements IAnswerRepository {

    constructor() {
        super(AnswerModel)
    }

    getByQuestionId(questionId: Types.ObjectId, sort?: any): Promise<Answer[]> {
        let sortOption = sort ? sort : '-createdUtc';
        return AnswerModel.find({question: questionId}).sort(sortOption).lean().exec()
            .then((answers: Answer[]) =>
                Promise.all(answers.map((answer) => this.applyAdditionalFunction(answer))));
    }

    create(answer: Answer): Promise<Answer> {
        delete answer.lastEditedUtc;
        return super.create(answer).then((answer) => {
            return this.getById(answer._id);
        });
    }

    update(answer: Answer): Promise<Answer> {
        delete answer.lastEditedUtc;
        return super.update(answer).then((answer) => {
            return this.getById(answer._id);
        });
    }

    findOneAndUpdateVoteAnswer(userAnswerVote: UserAnswerVote): Promise<Answer> {
        return UserAnswerVoteModel.findOneAndUpdate(
            {user: userAnswerVote.user, answer: userAnswerVote.answer},
            userAnswerVote, {upsert: true}).then((obj: UserAnswerVote) => {
            return this.getById(userAnswerVote.answer);
        });
    }

    protected applyRestriction(answer: Answer): Answer {
        if (answer.author) {
            delete answer.author.local;
        }
        answer.comments = answer.comments.map((comment: QuestionComment) => {
            delete comment.commentBy.local;
            return comment;
        });
        return answer;
    }

    protected applyAdditionalFunction(answer: Answer): Promise<Answer> {
        return UserAnswerVoteModel.find({answer: answer}).lean().exec()
            .then((userVote: UserAnswerVote[]) => {
                const upVote = userVote.filter((userVote) => userVote.upVote == true).length;
                const downVote = userVote.length - upVote;
                answer.upVotes = upVote;
                answer.downVotes = downVote;
                return answer;
            });
    }

}