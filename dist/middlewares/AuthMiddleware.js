"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../Container");
var JsonWebTokenUtil_1 = require("../utils/JsonWebTokenUtil");
var AppError_1 = require("../errors/AppError");
exports.mustBeAuthenticated = function (req, res, next) {
    try {
        var userRepository = Container_1.RepositoryProvider.UserRepository;
        var payload = JsonWebTokenUtil_1.verifyToken(req.headers.authorization);
        userRepository.getById(payload._id).then(function (user) {
            req.user = user;
            next();
        });
    }
    catch (err) {
        throw new AppError_1.AppError(err.message);
    }
};
exports.maybeAuthenticated = function (req, res, next) {
    try {
        var userRepository = Container_1.RepositoryProvider.UserRepository;
        var payload = JsonWebTokenUtil_1.verifyToken(req.headers.token);
        userRepository.getById(payload._id).then(function (user) {
            req.user = user;
            next();
        });
    }
    catch (err) {
        next();
    }
};
//# sourceMappingURL=AuthMiddleware.js.map