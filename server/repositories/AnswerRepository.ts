import {Answer, AnswerModel, IAnswer} from "../models/Answer";
import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {Types} from "mongoose";
export interface IAnswerRepository extends IBaseRepository<Answer>{
    getByQuestionId(questionId: Types.ObjectId, sort? : any) : Promise<Answer[]>;
}

export class AnswerRepository extends BaseRepository<Answer, IAnswer> implements IAnswerRepository{

    constructor() {
        super(AnswerModel)
    }

    getByQuestionId(questionId: Types.ObjectId, sort? : any) : Promise<Answer[]>{
        let sortOption = sort? sort: '-createdUtc';
        return AnswerModel.find({question : questionId}).sort(sortOption).lean().exec();
    }

}