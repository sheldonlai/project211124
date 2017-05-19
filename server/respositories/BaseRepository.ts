import {EntityNotFoundError} from '../errors/EntityNotFoundError';
export abstract class BaseRepository {

    getModel(model : any){
        if (model == null){
            throw new EntityNotFoundError("Entity not found");
        }
        return model;
    }

}