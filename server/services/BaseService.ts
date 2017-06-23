import {AppLogger} from "../utils/Logger";
/**
 * Created by SHELDON on 6/23/2017.
 */


export abstract class BaseService {
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