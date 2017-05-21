import {EntityNotFoundError} from '../errors/EntityNotFoundError';
import {injectable} from 'inversify';
import {model, Document, Model, Types} from 'mongoose';
import {BaseModel} from '../models/BaseModel';
import {unmanaged} from 'inversify';

export interface IBaseRepository<T> {
    getAll(): Promise<T[]>
    getById(id : string | Types.ObjectId) : Promise<T>;
    filter(query: any): Promise<T[]>
    create(obj : T): Promise<T>;
    update(obj : T): Promise<T>;
    deleteById(id : string | Types.ObjectId) : Promise<T>;
}

@injectable()
export abstract class BaseRepository<T extends BaseModel, I extends Document & T>
    implements IBaseRepository<T>{

    constructor(@unmanaged() private model: Model<I>) {
    }

    getAll(): Promise<T[]> {
        return this.model.find()
            .lean().exec().then((res: I[]) => {
            return this.getModels(res);
        })
    }

    getById(id : string | Types.ObjectId): Promise<T> {
        return this.model.findById(id)
            .lean().exec().then((res : I) =>{
            return this.getModel(res);
        })
    }

    filter(query: any): Promise<T[]> {
        return this.model.find(query)
            .lean().exec().then((res: I[]) => {
            return this.getModels(res);
        })
    }

    create(obj: T): Promise<T> {
        delete obj._id;
        return this.model.create(obj).then((rse:I)=>{
            return rse.toObject();
        })
    }

    update(obj: T): Promise<T> {
        return this.model.findByIdAndUpdate(obj._id, obj, {new: true})
            .exec().then((res: I) => {
            return this.getModel(res);
        });
    }

    deleteById(id : string | Types.ObjectId): Promise<T> {
        return this.model.findByIdAndRemove(id)
            .exec().then((res: I) => {
            return this.getModel(res);
        });
    }

    private getModels(docs: any): T[] {
        return docs.map((doc) => {
            return this.getModel(doc);
        })
    }

    private getModel(doc : I): T {
        if (doc == null){
            throw new EntityNotFoundError('Entity not found');
        }
        return <T> doc;
    }

}