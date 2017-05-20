import {EntityNotFoundError} from '../errors/EntityNotFoundError';
import {injectable} from 'inversify';
import {model, Document, Model} from 'mongoose';
import {BaseModel} from '../models/BaseModel';

export interface IBaseRepository<T> {
    getById(obj : T) : Promise<T>;
    create(obj : T): Promise<T>;
    update(obj : T): Promise<T>;
    delete(obj : T): Promise<T>;
}

@injectable()
export abstract class BaseRepository<T extends BaseModel, I extends Document & T>
    implements IBaseRepository<T>{

    constructor(private model: Model<I>) {
    }

    getById(obj: T): Promise<T> {
        return this.model.findById(obj.id)
            .lean().exec().then(function(res : T){
            return this.getModel(res);
        })
    }

    create(obj: T): Promise<T> {
        return this.model.create(obj).then(function(rse:I){
            return rse.toObject();
        })
    }

    update(obj: T): Promise<T> {
        return this.model.findOneAndUpdate({_id :obj.id}, obj).exec().then(function(res: I){
            return this.getModel(res).toObject;
        });
    }

    delete(obj: T): Promise<T> {
        return this.model.findByIdAndRemove(obj.id).exec();
    }

    getModel(model : any){
        if (model == null){
            throw new EntityNotFoundError('Entity not found');
        }
        return model;
    }

}