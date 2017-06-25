"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listNumericalEnumValues = function (enumObj) {
    Object.keys(enumObj).map(function (k) { return enumObj[k]; }).filter(function (e) { return typeof e === "number"; });
};
//# sourceMappingURL=EnumsUtil.js.map