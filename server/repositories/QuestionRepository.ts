import {IQuestion, Question, QuestionComment, QuestionModel} from "../models/Question";
import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {IUser, User} from "../models/User";

export interface IQuestionRepository extends IBaseRepository<Question>{
    getQuestionsByAuthor(user: User):Promise<Question[]>;
    getQuestionByTitle(title: string): Promise<Question>;
}

export class QuestionRepository extends
    BaseRepository<Question, IQuestion> implements IQuestionRepository {

    constructor(){
        super(QuestionModel);
    }

    create(question : Question): Promise<Question>{
        return super.create(question);
    }
    update(question : Question): Promise<Question>{
        return super.update(question);
    }

    getQuestionByTitle(title: string): Promise<Question>{
        return QuestionModel.findOne({title : title})
            .lean().exec().then((question: Question) => {
                return this.getModel(question);
            });
    }

    getQuestionsByAuthor(user: User): Promise<Question[]>{
        return QuestionModel.find({author : user})
            .lean().exec().then((question: Question[]) => {
            return this.getModels(question);
        });
    }

    protected applyRestriction(question: Question): Question {
        if (question.author) {
            delete question.author.local;
        }
        question.comments = question.comments.map((comment: QuestionComment) => {
            delete comment.commentBy.local;
            return comment;
        });
        return question;
    }
}
