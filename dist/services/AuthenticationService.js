"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../models/User");
var UserTypeEnum_1 = require("../enums/UserTypeEnum");
var AppError_1 = require("../errors/AppError");
var stringUtils_1 = require("../utils/stringUtils");
var JsonWebTokenUtil_1 = require("../utils/JsonWebTokenUtil");
var BaseService_1 = require("./BaseService");
var AuthenticationService = (function (_super) {
    __extends(AuthenticationService, _super);
    function AuthenticationService(userRepository) {
        var _this = _super.call(this) || this;
        _this.userRepository = userRepository;
        return _this;
    }
    AuthenticationService.prototype.registerLocalUser = function (email, name, password) {
        var _this = this;
        return this.userRepository.getByEmail(email)
            .then(function (existingUser) {
            if (existingUser) {
                throw new AppError_1.AppError("Entered e-mail is already in use.");
            }
            else {
                var salt = stringUtils_1.default.genRandomString(16);
                var passwordHash = stringUtils_1.default.hashString(password, salt);
                var localProfile = new User_1.LocalProfile(passwordHash, salt);
                var newUser = new User_1.User(email, name, UserTypeEnum_1.UserTypeEnum.NORMAL, localProfile);
                return _this.userRepository.create(newUser);
            }
        });
    };
    AuthenticationService.prototype.login = function (email, password) {
        return this.userRepository.getByEmail(email)
            .then(function (user) {
            if (!user) {
                throw new AppError_1.AppError("The account does not exists!");
            }
            else {
                var salt = user.local.salt;
                var passwordHash = stringUtils_1.default.hashString(password, salt);
                if (user.local.password != passwordHash) {
                    // incorrect pass
                    throw new AppError_1.AppError("Wrong credentials, please try again");
                }
                var token = JsonWebTokenUtil_1.generateToken(user);
                return { token: token };
            }
        });
    };
    return AuthenticationService;
}(BaseService_1.BaseService));
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=AuthenticationService.js.map