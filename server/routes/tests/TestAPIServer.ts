import * as express from "express";
import * as http from "http";
import {BaseAPI} from "../BaseAPI";
import bodyParser = require("body-parser");
import {TestDatabase} from "../../repositories/tests/helpers/TestDatabase";

export class TestApiServer {
    server: http.Server;
    db: TestDatabase;

    get port () {
        return this.server.address().port
    }
    static async bootstrap(listOfRoutes: BaseAPI[]): Promise<TestApiServer> {
        /*
        register all the routes given to the the function
        and returns a http.Server class so tests can access the registered port
        */
        let app = express();
        const testDatabase = new TestDatabase();
        await testDatabase.connect();
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json({limit: '50mb'}));
        listOfRoutes.forEach((route) => app.use(route.router));
        let server = http.createServer(app);
        await new Promise((fulfill) => {
            server.listen(0, function (res) {
                fulfill(server);
                console.log("server has started");
            })
        })
        return new TestApiServer(server, testDatabase);
    };

    private constructor(server, db){
        this.server = server;
        this.db = db;
    }

    async stopServer() {
        await this.db.disconnect();
        await new Promise((resolve) => {
            this.server.close(() => {
                resolve(1);
            })
        })
    }
}