import {EntityNotFoundError} from '../errors/EntityNotFoundError';
import {injectable} from 'inversify';
import {model, Document, Model} from 'mongoose';

export interface IBaseRepository<T> {
    getById(obj : T) : Promise<T>;
    create(obj : T): Promise<T>;
    update(obj : T): Promise<T>;
    delete(obj : T): Promise<T>;
}

@injectable()
export abstract class BaseRepository<T, I extends Document & T>
    implements IBaseRepository<T>{

    constructor(private model: Model<I>) {
    }

    getById(obj: T): Promise<T> {
        throw new Error('Method not implemented.');
    }

    create(obj: T): Promise<T> {
        throw new Error('Method not implemented.');
    }

    update(obj: T): Promise<T> {
        throw new Error('Method not implemented.');
    }

    delete(obj: T): Promise<T> {
        throw new Error('Method not implemented.');
    }

    getModel(model : any){
        if (model == null){
            throw new EntityNotFoundError('Entity not found');
        }
        return model;
    }

}