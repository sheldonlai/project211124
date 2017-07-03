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
    if (storageType === StorageTypeEnum.LOCAL) {
        return multer({ storage: diskStorage() })
    } else {
        return multer({ storage: defaultStorage() })
    }
}

/**
 * Get the default storage
 */
function defaultStorage() {
    return diskStorage();
}

/**
 * Saves the uploaded file on the /static/userUpload directory
 */
function diskStorage() {
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