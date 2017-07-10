import {Document, Model, Types} from "mongoose";
import {BaseModel} from "../models/BaseModel";
import {AppError} from "../errors/AppError";

export interface IBaseRepository<T> {
    getAll(options?: SortLimitOptions): Promise<T[]>
    getById(id: string | Types.ObjectId): Promise<T>;
    findOne(query: any): Promise<T>;
    filter(query: any): Promise<T[]>
    create(obj: T): Promise<T>;
    update(obj: T): Promise<T>;
    deleteById(id: string | Types.ObjectId): Promise<T>;
}

export interface SortLimitOptions {
    sort?: any;
    limit?: number;
}


export abstract class BaseRepository<T extends BaseModel, I extends Document & T>
    implements IBaseRepository<T> {

    constructor(private model: Model<I>) {
    }

    getAll(options?: SortLimitOptions): Promise<T[]> {
        let promise = this.model.find();
        if (options) {
            promise = (options.sort) ? promise.sort(options.sort) : promise;
            promise = (options.limit) ? promise.limit(options.limit) : promise;
        }
        return promise.lean().exec()
            .then((res: T[]) => Promise.all(res.map((model) => this.applyAdditionalFunction(model))))
            .then((res: T[]) => {
            return this.getModels(res);
        })
    }

    getById(id: string | Types.ObjectId): Promise<T> {
        return this.model.findById(id).lean().exec()
            .then((res: T) => this.applyAdditionalFunction(res))
            .then((res: T) => {
            return this.getModel(res);
        })
    }

    findOne(query: any): Promise<T> { // Seems weird to throw exception if its not found
        return this.model.findOne(query).lean().exec()
            .then((res: T) => this.applyAdditionalFunction(res))
            .then((res: T) => {
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
        return this.model.create(obj)
            .then((res: T) => this.applyAdditionalFunction(res))
            .then((res: I) => {
            return this.getModel(res);
        })
    }

    update(obj: T): Promise<T> {
        return this.model.findByIdAndUpdate(obj._id, obj, {new: true}).exec()
            .then((res: T) => this.applyAdditionalFunction(res))
            .then((res: I) => {
            return this.getModel(res);
        });
    }

    deleteById(id: string | Types.ObjectId): Promise<T> {
        return this.model.findByIdAndRemove(id).exec()
            .then((res: T) => this.applyAdditionalFunction(res))
            .then((res: I) => {
            return this.getModel(res);
        });
    }

    protected getModels(objs: T[]): T[] {
        return objs.map((obj) => {
            return this.getModel(obj);
        });
    }

    protected getModel(obj: T | I): T {
        let result: T;
        if (obj == undefined || obj == null) {
            throw new AppError('Entity not found');
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

    protected applyAdditionalFunction(obj: T) : Promise<T> | T {
        return obj;
    }
}