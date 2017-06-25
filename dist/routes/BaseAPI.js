"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Phillip on 2017-06-04.
 */
var BaseAPI = (function () {
    function BaseAPI() {
    }
    BaseAPI.prototype.respondPromise = function (result, res, next) {
        result.then(function (object) {
            return res.json(object);
        }).catch(function (err) {
            return next(err);
        });
    };
    BaseAPI.prototype.respondJson = function (result, res, next) {
        if (result instanceof Error) {
            return next(result);
        }
        else {
            return res.json(result);
        }
    };
    return BaseAPI;
}());
exports.BaseAPI = BaseAPI;
//# sourceMappingURL=BaseAPI.js.map