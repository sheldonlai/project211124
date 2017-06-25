"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogInfoStatus_1 = require("../enums/LogInfoStatus");
/**
 * Created by SHELDON on 6/23/2017.
 */
var AppLogger = (function () {
    function AppLogger() {
    }
    AppLogger.log = function (message, type) {
        // maybe output to file later
        var prefix = '';
        console.log(type + ": " + message);
    };
    AppLogger.info = function (message) {
        AppLogger.log(message, LogInfoStatus_1.LogInfoStatus.INFO);
    };
    AppLogger.warn = function (message) {
        AppLogger.log(message, LogInfoStatus_1.LogInfoStatus.WARNING);
    };
    AppLogger.error = function (message) {
        AppLogger.log(message, LogInfoStatus_1.LogInfoStatus.ERROR);
    };
    return AppLogger;
}());
exports.AppLogger = AppLogger;
//# sourceMappingURL=Logger.js.map