import * as express from "express";
import * as http from "http";

export const TestApiServer = function (listOfRoutes: any[]): Promise<http.Server> {

    const app = express();
    const router = express.Router();
    listOfRoutes.forEach((route) => route(router));
    return new Promise((fulfill) => {
        return app.listen(0, function (server) {
            fulfill(server);
        })
    })
};