import {EntityNotFoundError} from '../errors/EntityNotFoundError';
import {injectable} from 'inversify';
import {model, Document, Model, Types} from 'mongoose';
import {BaseModel} from '../models/BaseModel';
import {unmanaged} from 'inversify';

export interface IBaseRepository<T> {
    getById(id : string | Types.ObjectId) : Promise<T>;
    create(obj : T): Promise<T>;
    update(obj : T): Promise<T>;
    delete(obj : T): Promise<T>;
    deleteById(id : string | Types.ObjectId) : Promise<T>;
}

@injectable()
export abstract class BaseRepository<T extends BaseModel, I extends Document & T>
    implements IBaseRepository<T>{

    constructor(@unmanaged() private model: Model<I>) {

    }

    getById(id : string | Types.ObjectId): Promise<T> {
        return this.model.findById(id)
            .lean().exec().then((res : T) =>{
            return this.getModel(res);
        })
    }

    create(obj: T): Promise<T> {
        return this.model.create(obj).then((rse:I)=>{
            return rse.toObject();
        })
    }

    update(obj: T): Promise<T> {
        return this.model.findOneAndUpdate({_id :obj._id}, obj, {new: true}).exec().then((res: I) => {
            return this.getModel(res).toObject();
        });
    }

    delete(obj: T): Promise<T> {
        return this.model.findByIdAndRemove(obj._id).exec();
    }

    deleteById(id : string | Types.ObjectId): Promise<T> {
        return this.model.findByIdAndRemove(id).exec();
    }

    getModel(model : any){
        if (model == null){
            throw new EntityNotFoundError('Entity not found');
        }
        return model;
    }

}