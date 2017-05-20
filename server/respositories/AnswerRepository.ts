import {Answer, IAnswer} from '../models/Answer';
import {injectable} from 'inversify';
import {BaseRepository} from './BaseRepository';
export interface IAnswerRepository {
    getAnswerByQId(questionId : string) : Promise<IAnswer[]>;
    createAnswer(answer: IAnswer): Promise<IAnswer>;
    updateAnswer(answer: IAnswer) : Promise<IAnswer>;
    deleteAnswer(answer: IAnswer): Promise<any>;
}

@injectable()
export class AnswerRepository extends BaseRepository{
    getAnswerByQId(questionId : string) : Promise<IAnswer[]>{
        return Answer.find({question : questionId}).lean().exec().then(function(answers :IAnswer[]){
            return this.getModel(answers);
        })
    }

    createAnswer(answer: IAnswer): Promise<IAnswer> {
        return Answer.create(answer).then(function(answer) {
            return this.getModel(answer).toObject();
        })
    }

    updateAnswer(answer: IAnswer): Promise<IAnswer> {
        return Answer.findOneAndUpdate(answer.id, answer).exec().then(function(answer){
            return this.getModel(answer).toObject();
        });
    }

    deleteAnswer(answer: IAnswer): Promise<any> {
        return Answer.findByIdAndRemove(answer.id).exec().then(function(){
            return;
        })
    }
}