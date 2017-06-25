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
/**
 * Created by SHELDON on 6/23/2017.
 */
var BaseService_1 = require("../BaseService");
describe('BaseServiceTest', function () {
    var TestService = (function (_super) {
        __extends(TestService, _super);
        function TestService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TestService;
    }(BaseService_1.BaseService));
    var testService = new TestService();
    test('should map the dictionary onto the object', function () {
        var obj = {
            a: 1,
            b: 2,
            c: 3,
            d: 4
        };
        var dict = {
            a: 100,
            b: 200,
            c: 300,
            d: 400
        };
        testService.mapKeysOntoObject(obj, dict);
        expect(obj).toEqual(dict);
    });
    test('should not map extra field into object', function () {
        var obj = {
            a: 1,
            b: 2,
            c: 3,
            d: 4
        };
        var dict = {
            a: 100,
            b: 200,
            c: 300,
            d: 400,
            e: 500
        };
        testService.mapKeysOntoObject(obj, dict);
        var expected = {
            a: 100,
            b: 200,
            c: 300,
            d: 400,
        };
        expect(obj).toEqual(expected);
    });
});
//# sourceMappingURL=BaseServiceTest.js.map