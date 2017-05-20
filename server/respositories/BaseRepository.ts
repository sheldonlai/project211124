import {EntityNotFoundError} from '../errors/EntityNotFoundError';
import {injectable} from 'inversify';

@injectable()
export abstract class BaseRepository {

    getModel(model : any){
        if (model == null){
            throw new EntityNotFoundError('Entity not found');
        }
        return model;
    }

}