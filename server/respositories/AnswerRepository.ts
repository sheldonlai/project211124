import {AnswerModel, Answer, IAnswer} from '../models/Answer';
import {injectable} from 'inversify';
import {BaseRepository, IBaseRepository} from './BaseRepository';
export interface IAnswerRepository extends IBaseRepository<Answer>{
}

@injectable()
export class AnswerRepository extends BaseRepository<Answer, IAnswer> implements IAnswerRepository{

    constructor() {
        super(AnswerModel)
    }

}