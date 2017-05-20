import {injectable} from "inversify";
import {IQuestion, Question, QuestionModel} from '../models/Question';
import {BaseRepository, IBaseRepository} from './BaseRepository';
import {IUser} from '../models/User';

export interface IQuestionRepository extends IBaseRepository<Question>{
    getQuestionByAuthor(user):Promise<any>;
}

@injectable()
export class QuestionRepository extends
    BaseRepository<Question, IQuestion> implements IQuestionRepository {

    constructor(){
        super(QuestionModel);
    }

    getQuestionByAuthor(user: IUser): Promise<any>{
        return QuestionModel.find({author : user})
            .lean().exec().then(function(question: Question){
            return this.getModel(question);
        });
    }

}
