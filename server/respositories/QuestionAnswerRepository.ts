import {injectable} from "inversify";
import {IQuestion, Question} from '../models/Question';
import {BaseRepository} from './BaseRepository';
import {Answer, IAnswer} from '../models/Answer';
export interface IQuestionAnswerRepository {
    getQuestionById(questionId : string) : Promise<IQuestion>;
    getAnswerByQId(questionId : string) : Promise<IAnswer[]>;
    createQuestion(Question): Promise<any>;
    createAnswer(answer: IAnswer): Promise<IAnswer>;
    updateQuestion(question : IQuestion): Promise<IQuestion>;
    updateAnswer(answer: IAnswer) : Promise<IAnswer>;
    deleteQuestion(question : IQuestion): Promise<any>;
    deleteAnswer(answer: IAnswer): Promise<any>;

    //getQuestionByAuthor(user):Promise<any>;
}

@injectable()
export class QuestionAnswerRepository extends BaseRepository implements IQuestionAnswerRepository {

    getQuestionById(questionId : string) : Promise<IQuestion>{
        return Question.findById(questionId).lean().exec().then( function (question : IQuestion) {
            return this.getModel(question);
        });
    }

    getAnswerByQId(questionId : string) : Promise<IAnswer[]>{
        return Answer.find({question : questionId}).lean().exec().then(function(answers :IAnswer[]){
            return this.getModel(answers);
        })
    }

    createQuestion(question : IQuestion): Promise<any> {
        return Question.create(question).then(function(question) {
            return this.getModel(question).toObject();
        })
    }

    createAnswer(answer: IAnswer): Promise<IAnswer> {
        return Answer.create(answer).then(function(answer) {
            return this.getModel(answer).toObject();
        })
    }

    updateQuestion(question: IQuestion): Promise<IQuestion> {
        return Question.findByIdAndUpdate(question.id, question).exec().then(function(question){
            return this.getModel(question);
        })
    }

    updateAnswer(answer: IAnswer): Promise<IAnswer> {
        return undefined;
    }

    deleteQuestion(question: IQuestion): Promise<any> {
        return Question.findByIdAndRemove(question.id).exec().then(function(){
            return;
        })
    }

    deleteAnswer(answer: IAnswer): Promise<any> {
        return Answer.findByIdAndRemove(answer.id).exec().then(function(){
            return;
        })
    }

}
