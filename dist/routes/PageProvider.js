"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var urls_1 = require("../urls");
var PageProvider = (function () {
    function PageProvider(router) {
        this.homePage = function (req, res, next) {
            res.sendFile(path.resolve(__dirname, '../../client/static/home.html'));
        };
        this.questionPage = function (req, res, next) {
            res.sendFile(path.resolve(__dirname, '../client/static/question.html'));
        };
        router.get(urls_1.APIUrls.MainPage + '*', this.homePage);
    }
    return PageProvider;
}());
exports.PageProvider = PageProvider;
//# sourceMappingURL=PageProvider.js.map