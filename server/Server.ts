import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import {NextFunction, Request, Response} from 'express';
import {PageProvider} from './routes/PageProvider';
import {HomeAPI} from './routes/HomeAPI';
import {QuestionAPI} from "./routes/QuestionAPI";
import {AnswerAPI} from "./routes/AnswerAPI";
import {AuthenticationAPI} from "./routes/AuthenticationAPI";
import {config} from "./config";
import {ServiceProvider} from "./Container";
import {AppError} from "./errors/AppError";

let favicon = require('serve-favicon');
let es6Renderer = require('express-es6-template-engine');

export class Server {
    public app: express.Application;
    private config;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor(custom_config?) {
        this.config = (custom_config)? custom_config : config;
        //create expressJS application
        this.app = express();
        //configure application
        this.configure();
    }

    private configure(): void {
        /* Database */
        this.connectMongoose();

        /* Set up a template engine */
        this.app.engine('html', es6Renderer);
        this.app.set('views', './server/views');
        this.app.set('view engine', 'html');

        this.app.get('/123', function(req, res) {
            let x = es6Renderer('emailVerificationTemplate.html', {locals: {name: 'Welcome!', link:"qwe"}});
            console.log(x);
            res.json(x);
        });

        /* Third party middleware */
        this.app.use(helmet());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(cookieParser());

        /* API for client side */
        this.api();

        /* Static files */
        this.staticFiles();

        /* Error Handler */
        this.app.use(this.errorHandler);
    }

    private connectMongoose(): void {
        let dbURI = this.config.database.URI;
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

        /* QuestionView Answer */

        new QuestionAPI(router, ServiceProvider.QuestionService);

        /* Authentication */
        new AuthenticationAPI(router, ServiceProvider.AuthenticationService);

        this.app.use('/api', router);
    }

    private errorHandler(err : AppError, req : Request, res : Response, next: NextFunction) {
       // console.log(err.message);   err may not be an AppError, need to check whether status presents or not
       //  console.log(err.status);
        console.error(err.stack);
        res.statusCode = err.status.code;
        res.json({error: err.message});
    }

}
