import {Server} from "./Server";
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
import * as mongoose from 'mongoose';

require('source-map-support').install();

import {Worker} from 'cluster';
import {SocketIOController} from './Socket.io.controller';
import {config} from "./config";

(<any>mongoose).Promise = global.Promise;

let devMode = config.dev.devMode;

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
    let server = require('http').Server(app);
    let io = require('socket.io')(server);
    let socketIoController = new SocketIOController(io);
    let port: number = 3000;

    server.listen(port, function () {
        let host = server.address().address;
        let port = server.address().port;
        console.log('This express app is listening on port:' + port);
    });
}
