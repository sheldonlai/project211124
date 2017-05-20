import {injectable} from "inversify";
import {IQuestion, Question} from '../models/Question';
import {BaseRepository} from './BaseRepository';
import {Answer, IAnswer} from '../models/Answer';
import {IUser} from '../models/User';

export interface IQuestionRepository {
    getQuestionById(questionId : string) : Promise<IQuestion>;
    createQuestion(Question): Promise<any>;
    updateQuestion(question : IQuestion): Promise<IQuestion>;
    deleteQuestion(question : IQuestion): Promise<any>;
    getQuestionByAuthor(user):Promise<any>;

}

@injectable()
export class QuestionRepository extends BaseRepository implements IQuestionRepository {

    getQuestionById(questionId : string) : Promise<IQuestion>{
        return Question.findById(questionId).lean().exec().then( function (question : IQuestion) {
            return this.getModel(question);
        });
    }

    createQuestion(question : IQuestion): Promise<any> {
        return Question.create(question).then(function(question) {
            return this.getModel(question).toObject();
        })
    }

    updateQuestion(question: IQuestion): Promise<IQuestion> {
        return Question.findByIdAndUpdate(question.id, question).exec().then(function(question){
            return this.getModel(question);
        })
    }

    deleteQuestion(question: IQuestion): Promise<any> {
        return Question.findByIdAndRemove(question.id).exec().then(function(){
            return;
        })
    }

    getQuestionByAuthor(user: IUser): Promise<any>{
        return Question.find({author : user}).lean().exec().then(function(question: IQuestion){
            return this.getModel(question);
        });
    }

}
