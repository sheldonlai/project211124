/**
 * Created by Phillip on 2017-07-02.
 */

import * as mime from "mime";
import * as multer from "multer";
import StringUtils from "../utils/stringUtils";
import {StorageTypeEnum} from "../enums/StorageType";

const localStoragePath = './static/media';

/**
 * Initialize the 'multer' middle-ware, which is used for file upload.
 * Currently, only 'Disk' storage is supported.
 */
export function multerUpload(storageType?: StorageTypeEnum) { // change this to enum
    let storage: multer.StorageEngine;
    switch(storageType) {
        case StorageTypeEnum.DISK:
            storage = diskStorage();
            break;
        case StorageTypeEnum.MEMORY:
            storage = memoryStorage();
            break;
        default:
            storage = defaultStorage();
            break;
    }
    return multer({ storage: storage })
}

/**
 * Get the default storage
 */
function defaultStorage() {
    return memoryStorage();
}

/**
 * Saves the uploaded file on the /static/userUpload directory
 */
function diskStorage(): multer.StorageEngine {
    return multer.diskStorage(
        {
            destination: function(req, file, cb) {
                cb(null, localStoragePath);
            },
            filename: function(req, file, cb) {
                cb(null, StringUtils.genRandomString(10) + '_' + Date.now() + '.' + mime.extension(file.mimetype));
            }
        }
    );
}

/**
 *  Saves the uploaded file in memory as Buffer
 */
function memoryStorage(): multer.StorageEngine {
    return multer.memoryStorage();
}