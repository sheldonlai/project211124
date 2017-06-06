import {EntityNotFoundError} from '../errors/EntityNotFoundError';
import {injectable} from 'inversify';
import {model, Document, Model, Types} from 'mongoose';
import {BaseModel} from '../models/BaseModel';
import {unmanaged} from 'inversify';

export interface IBaseRepository<T> {
    getAll(): Promise<T[]>
    getById(id : string | Types.ObjectId) : Promise<T>;
    findOne(query: any): Promise<T>;
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
        return this.model.find().lean().exec().then((res: T[]) => {
            return this.getModels(res);
        })
    }

    getById(id : string | Types.ObjectId): Promise<T> {
        return this.model.findById(id).lean().exec().then((res : T) =>{
            return this.getModel(res);
        })
    }

    findOne(query: any): Promise<T> { // Seems weird to throw exception if its not found
        return this.model.findOne(query).lean().exec().then((res: T) => {
            return this.getModel(res);
        })
    }

    filter(query: any): Promise<T[]> {
        return this.model.find(query).lean().exec().then((res: T[]) => {
            return this.getModels(res);
        })
    }

    create(obj: T): Promise<T> {
        delete obj._id;
        return this.model.create(obj).then((res: I) => {
            return this.getModel(res);
        })
    }

    update(obj: T): Promise<T> {
        return this.model.findByIdAndUpdate(obj._id, obj, {new: true}).exec().then((res: I) => {
            return this.getModel(res);
        });
    }

    deleteById(id : string | Types.ObjectId): Promise<T> {
        return this.model.findByIdAndRemove(id).exec().then((res: I) => {
            return this.getModel(res);
        });
    }

    private getModels(objs: T[]): T[] {
        return objs.map((obj) => {
            return this.getModel(obj);
        });
    }

    private getModel(obj : T | I): T {
        let result: T;
        if (obj == undefined || obj == null) {
            throw new EntityNotFoundError('Entity not found');
        } else if ((<I> obj).toObject == undefined) {
            result = <T> obj;
        } else {
            result = <T> (<I> obj).toObject()
        }
        return this.applyRestriction(result);
    }

    protected applyRestriction(obj: T): T {
        return obj;
    }
}