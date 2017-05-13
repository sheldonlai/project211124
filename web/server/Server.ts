import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import {AppError} from '../common/errors/AppError';
import {Request, Response} from 'express';
import {Route} from './routes/Route';
import {HomeAPI} from './API/HomeAPI';

let favicon = require('serve-favicon');
let config = require('./config');

export class Server {
    public app: express.Application;
    public server: http.Server;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

    }

    public config() {

        var dbURI = config.database;
        mongoose.connect(dbURI);
        var db = mongoose.connection;

        db.on('error', console.error);
        db.on('connected', function () {
            console.log('Mongoose default connection open to ' + dbURI);
        });

        this.app.use(favicon(path.join(__dirname, '../client/static/favicon.ico')));
        this.app.use('/', express.static(path.resolve(__dirname, '../client/static/')))
        this.app.use('/node_modules', express.static(path.resolve(__dirname, '../node_modules')));
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(cookieParser());

        let router = express.Router();
        new Route(router);
        this.app.use(router);
        this.api();

        this.app.use(function (err : AppError, req : Request, res : Response, next: any) {
            res.statusCode = (err.status)? err.status : 500;

            res.json({
                error : err.message
            });
        });

    }


    public api() {
        let router = express.Router();
        new HomeAPI(router);
        this.app.use('/api', router);
    }

}
