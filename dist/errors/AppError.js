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
var AppError = (function (_super) {
    __extends(AppError, _super);
    function AppError(message, code) {
        var _this = _super.call(this, message) || this;
        _this.name = 'AppError';
        _this.status = (code) ? code : 400;
        return _this;
    }
    return AppError;
}(Error));
exports.AppError = AppError;
//# sourceMappingURL=AppError.js.map