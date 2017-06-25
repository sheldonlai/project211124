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
var mongoose_1 = require("mongoose");
var UserTypeEnum_1 = require("../enums/UserTypeEnum");
var BaseModel_1 = require("./BaseModel");
var AppError_1 = require("../errors/AppError");
var User = (function (_super) {
    __extends(User, _super);
    function User(email, name, role, local, facebook) {
        var _this = _super.call(this) || this;
        _this.email = email;
        _this.name = name;
        _this.role = role;
        _this.verified = false;
        _this.local = local;
        _this.facebook = facebook;
        return _this;
    }
    return User;
}(BaseModel_1.BaseModel));
exports.User = User;
var LocalProfile = (function () {
    function LocalProfile(password, salt) {
        this.password = password;
        this.salt = salt;
    }
    return LocalProfile;
}());
exports.LocalProfile = LocalProfile;
var FacebookProfile = (function () {
    function FacebookProfile(id, access_token) {
        this.id = id;
        this.access_token = access_token;
    }
    return FacebookProfile;
}());
exports.FacebookProfile = FacebookProfile;
var LocalSubSchema = new mongoose_1.Schema({
    password: { type: String, required: true },
    salt: { type: String, required: true }
}, {
    _id: false
});
var FacebookSubSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    access_token: { type: String, required: true },
}, {
    _id: false
});
exports.userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: Object.keys(UserTypeEnum_1.UserTypeEnum), required: true, default: 'normal' },
    verified: { type: Boolean, required: true, default: false },
    local: { type: LocalSubSchema },
    facebook: { type: FacebookSubSchema }
}, {
    timestamps: true
});
exports.userSchema.pre('save', function (nextFunction) {
    if (!this.local && !this.facebook) {
        nextFunction(new AppError_1.AppError("Either local or facebook profile must be defined"));
    }
    nextFunction();
});
exports.UserModel = mongoose_1.model('user', exports.userSchema);
//# sourceMappingURL=User.js.map