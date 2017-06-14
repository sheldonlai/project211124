import {IQuestion, Question, QuestionModel} from '../models/Question';
import {BaseRepository, IBaseRepository} from './BaseRepository';
import {IUser} from '../models/User';

export interface IQuestionRepository extends IBaseRepository<Question>{
    getQuestionByAuthor(user):Promise<any>;
}

export class QuestionRepository extends
    BaseRepository<Question, IQuestion> implements IQuestionRepository {

    constructor(){
        super(QuestionModel);
    }

    create(question : Question): Promise<Question>{
        delete question.lastEditedUtc;
        return super.create(question);
    }
    update(question : Question): Promise<Question>{
        delete question.lastEditedUtc;
        return super.update(question);
    }

    getQuestionByAuthor(user: IUser): Promise<any>{
        return QuestionModel.find({author : user})
            .lean().exec().then(function(question: Question){
            return this.getModel(question);
        });
    }

}
