"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../../../models/User");
var UserTypeEnum_1 = require("../../../enums/UserTypeEnum");
/**
 * Created by Phillip on 2017-05-28.
 */
var FakeModels = (function () {
    function FakeModels() {
    }
    FakeModels.prototype.localUser = function () {
        var localProfile = new User_1.LocalProfile("hashedPassword", "bestSalt");
        var random = Math.random() * 10000 / 3000;
        return new User_1.User("sampleUser" + random + "@askalot.corp", "Chuck Norris", UserTypeEnum_1.UserTypeEnum.NORMAL, localProfile);
    };
    return FakeModels;
}());
exports.FakeModels = FakeModels;
//# sourceMappingURL=FakeModels.js.map