"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var helmet = require("helmet");
var PageProvider_1 = require("./routes/PageProvider");
var HomeAPI_1 = require("./routes/HomeAPI");
var QuestionAPI_1 = require("./routes/QuestionAPI");
var AuthenticationAPI_1 = require("./routes/AuthenticationAPI");
var config_1 = require("./config");
var Container_1 = require("./Container");
var favicon = require('serve-favicon');
var Server = (function () {
    function Server(custom_config) {
        this.config = (custom_config) ? custom_config : config_1.config;
        //create expressJS application
        this.app = express();
        //configure application
        this.configure();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.configure = function () {
        /* Database */
        this.connectMongoose();
        /* Third party middleware */
        this.app.use(helmet());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(cookieParser());
        /* API for client side */
        this.api();
        /* Static files */
        this.staticFiles();
        /* Error Handler */
        this.app.use(this.errorHandler);
    };
    Server.prototype.connectMongoose = function () {
        var dbURI = this.config.database.URI;
        mongoose.connect(dbURI);
        var db = mongoose.connection;
        db.on('error', console.error);
        db.on('connected', function () {
            console.log('Mongoose default connection open to ' + dbURI);
        });
    };
    Server.prototype.staticFiles = function () {
        this.app.use(favicon(path.join(__dirname, '../client/static/favicon.ico')));
        this.app.use('/', express.static(path.resolve(__dirname, '../client/static/')));
        this.app.use('/node_modules', express.static(path.resolve(__dirname, '../node_modules')));
        var router = express.Router();
        new PageProvider_1.PageProvider(router);
        this.app.use(router);
    };
    Server.prototype.api = function () {
        var router = express.Router();
        /* Home */
        new HomeAPI_1.HomeAPI(router);
        /* QuestionView Answer */
        new QuestionAPI_1.QuestionAPI(router, Container_1.ServiceProvider.QuestionService);
        /* Authentication */
        new AuthenticationAPI_1.AuthenticationAPI(router, Container_1.ServiceProvider.AuthenticationService);
        this.app.use('/api', router);
    };
    Server.prototype.errorHandler = function (err, req, res, next) {
        console.error(err.stack);
        res.statusCode = (err.status) ? err.status : 500;
        res.json({ error: err.message });
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=Server.js.map