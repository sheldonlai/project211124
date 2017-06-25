"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Move this into routes, or crate a separate module.
var SocketIOController = (function () {
    function SocketIOController(io) {
        var _this = this;
        this.io = io;
        this.onConnection = function (socket) {
            _this.checkPermission(socket.handshake.headers).then(function () {
                //do something
            }).catch(function (err) {
                //error handling
            });
        };
        this.onConnect = function (socket) {
            _this.checkPermission(socket.handshake.headers).then(function () {
                //do something
            }).catch(function (err) {
                //error handling
            });
        };
        this.onLoadOlderMessages = function (socket) {
            _this.checkPermission(socket.handshake.headers).then(function () {
                //do something
            }).catch(function (err) {
                //error handling
            });
        };
        this.setup();
    }
    SocketIOController.prototype.setup = function () {
        this.io.on('connection', this.onConnection);
        this.io.on('connect', this.onConnect);
        this.io.on('load-older-messages', this.onLoadOlderMessages);
    };
    SocketIOController.prototype.checkPermission = function (headers) {
        //TODO: Check for login, chat _id
        return null;
    };
    return SocketIOController;
}());
exports.SocketIOController = SocketIOController;
//# sourceMappingURL=Socket.io.controller.js.map