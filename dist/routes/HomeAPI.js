"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var urls_1 = require("../urls");
var HomeAPI = (function () {
    function HomeAPI(router) {
        this.homeData = function (req, res, next) {
            res.json({ 'message': 'Hello world' });
        };
        router.get(urls_1.APIUrls.MainPage, this.homeData);
    }
    return HomeAPI;
}());
exports.HomeAPI = HomeAPI;
//# sourceMappingURL=HomeAPI.js.map