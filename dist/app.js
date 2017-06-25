"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = require("./Server");
var mongoose = require("mongoose");
var http = require("http");
var socketio = require("socket.io");
var Socket_io_controller_1 = require("./Socket.io.controller");
var config_1 = require("./config");
var support = require("source-map-support");
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
support.install();
mongoose.Promise = global.Promise;
var devMode = config_1.config.dev.devMode;
if (cluster.isMaster && !devMode) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', function (worker, code, signal) {
        console.log('worker %d died (%s). restarting...', worker.process.pid, signal || code);
        cluster.fork();
    });
}
else {
    var app = Server_1.Server.bootstrap().app;
    var server_1 = http.createServer(app);
    var io = socketio(server_1);
    var socketIoController = new Socket_io_controller_1.SocketIOController(io);
    var port = 3000;
    server_1.listen(port, function () {
        var host = server_1.address().address;
        var port = server_1.address().port;
        console.log('This express app is listening on port:' + port);
    });
}
//# sourceMappingURL=app.js.map