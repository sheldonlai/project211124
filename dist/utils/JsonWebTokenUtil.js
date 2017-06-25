"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var config_1 = require("../config");
var AppError_1 = require("../errors/AppError");
exports.generateToken = function (payload) {
    return jsonwebtoken_1.sign(payload, config_1.config.jwt.secretKey);
};
exports.verifyToken = function (token) {
    try {
        return jsonwebtoken_1.verify(token.split(" ")[1], config_1.config.jwt.secretKey);
    }
    catch (err) {
        throw new AppError_1.AppError('Invalid token');
    }
};
//# sourceMappingURL=JsonWebTokenUtil.js.map