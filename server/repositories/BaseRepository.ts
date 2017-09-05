import * as mongoose from "mongoose";
import {Document, Model, Types} from "mongoose";
import {BaseModel} from "../models/Base/BaseModel";
import {AppError} from "../errors/AppError";
import {elasticSearchModel} from "../elasticSearch/ElasticSearchUtils";
import {SearchScoreModel} from "../models/Base/SearchScoreModel";

export interface IBaseRepository<T> {
    getAll(options?: SortLimitOptions): Promise<T[]>
    getById(id: string | Types.ObjectId): Promise<T>;
    findOne(query: any): Promise<T>;
    filter(query: any): Promise<T[]>
    create(obj: T): Promise<T>;
    update(obj: T): Promise<T>;
    deleteById(id: string | Types.ObjectId): Promise<T>;
    search(query: any): Promise<T[]>;
    searchReturnWithScore(query): Promise<SearchScoreModel<T>[]>;
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

    search(query): Promise<T[]> {
        let ids: any[];
        return elasticSearchModel(this.model, query).then((results) => {
            ids = results.hits.hits.map((obj) => mongoose.Types.ObjectId(obj._id));
            return this.model.find({
                '_id': { $in: ids}
            }).lean().exec();
        }).then((elements: T[]) => {
            // re order the list
            elements = ids.map((id) => {
                return elements.find((record) => {
                    return record._id.toString() === id.toString();
                });
            });
            return Promise.all(elements.map((record)=>this.applyAdditionalFunction(record)));
        }).then((array) => {
            return this.getModels(array);
        })
    }

    searchReturnWithScore(query): Promise<SearchScoreModel<T>[]> {
        let ids: any[];
        let scores: any[];
        return elasticSearchModel(this.model, query).then((results) => {
            ids = [];
            scores = [];
            for (let i = 0; i < results.hits.hits.length; i ++){
                let e = results.hits.hits[i];
                ids.push(mongoose.Types.ObjectId(e._id));
                scores.push(e._score);
            }
            return this.model.find({
                '_id': { $in: ids}
            }).lean().exec();
        }).then((elements: T[]) => {
            // re order the list
            return Promise.all(elements.map((record)=>this.applyAdditionalFunction(record)));
        }).then((array) => {
            return this.getModels(array);
        }).then((elements) => {
            let newList = ids.map((id, index) => {
                let element =  elements.find((record) => {
                    return record._id.toString() === id.toString();
                });
                return new SearchScoreModel(scores[index],element);
            });
            return newList;
        })
    }

    protected getModels(objs: T[]): T[] {
        for (let i in objs){
            objs[i] = this.getModel(objs[i]);
        }
        return objs;
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