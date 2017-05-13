import {Server} from "./Server";
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
import * as mongoose from 'mongoose';

let config = require('./config');

import * as http from "http";
import {Worker} from 'cluster';

(<any>mongoose).Promise = global.Promise;

let devMode = config.devMode;

if (cluster.isMaster && !devMode ) {
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker: Worker, code: number, signal: string) => {
        console.log('worker %d died (%s). restarting...',
            worker.process.pid, signal || code);
        cluster.fork();
    });
} else {

    let app = Server.bootstrap().app;
    let port: number = 3000;

    let server : http.Server = app.listen(port, function () {
        let host = server.address().address;
        let port = server.address().port;
        console.log('This express app is listening on port:' + port);
    });
}
