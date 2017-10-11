import {IRecruitment, Recruitment, RecruitmentComment, RecruitmentModel} from "../models/Recruitment"
import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {IUser, User} from "../models/User";
import {isNullOrUndefined} from "util";
import {AppError} from "../errors/AppError";
import {ClientError} from "../errors/HttpStatus";
import {removeUserRestrictedInfo} from "../utils/UserUtils";
import {Tag} from "../models/Tags";

export interface IRecruitmentRepository extends IBaseRepository<Recruitment> {
    //getQuestionByTitle(title: string): Promise<Question>;
    //findOneAndUpdateVoteQuestion(userQuestionVote: UserQuestionVote): Promise<Question>;
    getRecruitmentByAuthor(user: User): Promise<Recruitment[]>
    increaseViewCount(questionId: any) :Promise<any>
}

export class RecruitmentRepository extends BaseRepository<Recruitment, IRecruitment> implements IRecruitmentRepository {
    constructor() {
        super(RecruitmentModel);
    }

    create(recruitment: Recruitment): Promise<Recruitment> {
        delete recruitment.createdAt;
        recruitment.updatedAt = undefined;
        return super.create(recruitment).then((recruitment: Recruitment) => {
            return this.getById(recruitment._id);
        });
    }

    update(recruitment: Recruitment): Promise<Recruitment> {
        delete recruitment.createdAt;
        return super.update(recruitment);
    }

    getRecruitmentByAuthor(user: User): Promise<Recruitment[]> {
        return RecruitmentModel.find({createdBy: user._id}).lean().exec()
            .then((recruitments: Recruitment[]) => Promise.all(r => this.applyAdditionalFunction(r)))
            .then((recruitments: Recruitment[]) => {
                return this.getModels(recruitments);
            });
    }

    /*getQuestionByTitle(title: string): Promise<Question> {
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
    }*/

    increaseViewCount(recruitmentId: any): Promise<any> {
        return RecruitmentModel.findByIdAndUpdate(recruitmentId, {$inc: {views: 1}}).then(() => undefined);
    }

    protected applyRestriction(recruitment: Recruitment): Recruitment {
        removeUserRestrictedInfo(recruitment.createdBy);
        recruitment.comments = recruitment.comments.map((comment: RecruitmentComment) => {
            removeUserRestrictedInfo(comment.createdBy);
            return comment;
        });
        return recruitment;
    }
}
