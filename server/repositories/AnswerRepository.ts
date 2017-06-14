import {AnswerModel, Answer, IAnswer} from '../models/Answer';
import {BaseRepository, IBaseRepository} from './BaseRepository';
export interface IAnswerRepository extends IBaseRepository<Answer>{
}

export class AnswerRepository extends BaseRepository<Answer, IAnswer> implements IAnswerRepository{

    constructor() {
        super(AnswerModel)
    }

}