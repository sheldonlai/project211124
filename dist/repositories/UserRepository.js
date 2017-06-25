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
var BaseRepository_1 = require("./BaseRepository");
var User_1 = require("../models/User");
var UserRepository = (function (_super) {
    __extends(UserRepository, _super);
    function UserRepository() {
        return _super.call(this, User_1.UserModel) || this;
    }
    UserRepository.prototype.getByEmail = function (email) {
        return User_1.UserModel.findOne({ email: email }).lean().exec();
    };
    UserRepository.prototype.applyRestriction = function (user) {
        delete user.local;
        delete user.facebook;
        return user;
    };
    return UserRepository;
}(BaseRepository_1.BaseRepository));
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map