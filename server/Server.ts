import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import {AppError} from '../common/errors/AppError';
import {NextFunction, Request, Response} from 'express';
import {PageProvider} from './routes/PageProvider';
import {HomeAPI} from './routes/HomeAPI';
import {Container} from "inversify";
import {QuestionAnswerAPI} from "./routes/QuestionAnswerAPI";
import {IQuestionAnswerService} from "./services/QuestionAnswerService";
import TYPES from "./enums/ClassTypes";
import {IAuthenticationService} from "./services/AuthenticationService";
import {AuthenticationAPI} from "./routes/AuthenticationAPI";

let favicon = require('serve-favicon');
let config = require('./config');

export class Server {
    public app: express.Application;
    public container : Container;

    public static bootstrap(container: Container): Server {
        return new Server(container);
    }

    constructor(container : Container) {
        //create expressJS application
        this.app = express();
        //configure application
        this.container = container;
        this.configure();
    }

    private configure(): void {
        /* Database */
        this.connectMongoose();

        /* Static files */
        this.staticFiles();

        /* Third party middleware */
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(cookieParser());

        /* API for client side */
        this.api();

        /* Error Handler */
        this.app.use(this.errorHandler);
    }

    private connectMongoose(): void {
        let dbURI = config.database.URI;
        mongoose.connect(dbURI);
        let db = mongoose.connection;

        db.on('error', console.error);
        db.on('connected', function () {
            console.log('Mongoose default connection open to ' + dbURI);
        });
    }

    private staticFiles() {
        this.app.use(favicon(path.join(__dirname, '../client/static/favicon.ico')));
        this.app.use('/', express.static(path.resolve(__dirname, '../client/static/')));
        this.app.use('/node_modules', express.static(path.resolve(__dirname, '../node_modules')));
        let router = express.Router();
        new PageProvider(router);
        this.app.use(router);
    }


    private api() {
        let router = express.Router();

        /* Home */
        new HomeAPI(router);

        /* Question Answer */
        let qAService : IQuestionAnswerService = this.container.get<IQuestionAnswerService>(TYPES.IQAService);
        new QuestionAnswerAPI(router, qAService);

        /* Authentication */
        let authenticationService: IAuthenticationService = this.container.get<IAuthenticationService>(TYPES.IAuthService);
        new AuthenticationAPI(router, authenticationService);

        this.app.use('/api', router);
    }

    private errorHandler(err : AppError, req : Request, res : Response, next: NextFunction) {
        console.error(err.stack);
        res.statusCode = (err.status) ? err.status : 500;
        res.json({error: err.message});
    }

}
