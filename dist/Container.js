"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnswerRepository_1 = require("./repositories/AnswerRepository");
var QuestionRepository_1 = require("./repositories/QuestionRepository");
var UserRepository_1 = require("./repositories/UserRepository");
var AuthenticationService_1 = require("./services/AuthenticationService");
var QuestionService_1 = require("./services/QuestionService");
var RepositoryProvider = (function () {
    function RepositoryProvider() {
    }
    return RepositoryProvider;
}());
RepositoryProvider.AnswerRepository = new AnswerRepository_1.AnswerRepository();
RepositoryProvider.QuestionRepository = new QuestionRepository_1.QuestionRepository();
RepositoryProvider.UserRepository = new UserRepository_1.UserRepository();
exports.RepositoryProvider = RepositoryProvider;
var ServiceProvider = (function () {
    function ServiceProvider() {
    }
    return ServiceProvider;
}());
ServiceProvider.AuthenticationService = new AuthenticationService_1.AuthenticationService(RepositoryProvider.UserRepository);
ServiceProvider.QuestionService = new QuestionService_1.QuestionService(RepositoryProvider.QuestionRepository, RepositoryProvider.AnswerRepository);
exports.ServiceProvider = ServiceProvider;
//# sourceMappingURL=Container.js.map