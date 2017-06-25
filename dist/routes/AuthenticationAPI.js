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
var BaseAPI_1 = require("./BaseAPI");
var urls_1 = require("../urls");
var AuthenticationAPI = (function (_super) {
    __extends(AuthenticationAPI, _super);
    function AuthenticationAPI(router, service) {
        var _this = _super.call(this) || this;
        _this.register = function (req, res, next) {
            var regReq = req.body;
            var result = _this.service.registerLocalUser(regReq.email, regReq.name, regReq.password);
            _this.respondPromise(result, res, next);
        };
        _this.login = function (req, res, next) {
            var loginReq = req.body;
            var result = _this.service.login(loginReq.email, loginReq.password);
            _this.respondPromise(result, res, next);
        };
        _this.service = service;
        router.post(urls_1.APIUrls.Login, _this.login);
        router.post(urls_1.APIUrls.Register, _this.register);
        return _this;
    }
    return AuthenticationAPI;
}(BaseAPI_1.BaseAPI));
exports.AuthenticationAPI = AuthenticationAPI;
//# sourceMappingURL=AuthenticationAPI.js.map