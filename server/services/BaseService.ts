import {AppLogger} from "../utils/Logger";
import {AppError} from "../errors/AppError";
/**
 * Created by SHELDON on 6/23/2017.
 */


export abstract class BaseService {

    checkRequiredFields = (dto: any, fields: string[]) => {
        let missingFields = fields.filter(field => !dto[field]);
        if (missingFields.length > 0) {
            throw new AppError("The required fields : " + missingFields.join(", ") + " are missing.");
        }
    };


    mapKeysOntoObject(oldObj: any, dictionary: any): any{
        let keys = Object.keys(dictionary);
        for (let key of keys){
            if (oldObj.hasOwnProperty(key)){
                oldObj[key] = dictionary[key];
            } else {
                AppLogger.warn('Tried to change non existing field: ' + key + '. In BaseService.mapmapKeysOntoObjectKey.')
            }
        }
        return oldObj;
    }
}