"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger_1 = require("../utils/Logger");
/**
 * Created by SHELDON on 6/23/2017.
 */
var BaseService = (function () {
    function BaseService() {
    }
    BaseService.prototype.mapKeysOntoObject = function (oldObj, dictionary) {
        var keys = Object.keys(dictionary);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (oldObj.hasOwnProperty(key)) {
                oldObj[key] = dictionary[key];
            }
            else {
                Logger_1.AppLogger.warn('Tried to change non existing field: ' + key + '. In BaseService.mapmapKeysOntoObjectKey.');
            }
        }
        return oldObj;
    };
    return BaseService;
}());
exports.BaseService = BaseService;
//# sourceMappingURL=BaseService.js.map