import * as SocketIO from 'socket.io'
import {Container} from 'inversify';
import {User} from './models/User';

// TODO: Move this into routes, or crate a separate module.
export class SocketIOController {
    constructor(private io : SocketIO.Server, private container : Container){
        this.setup()

    }

    setup(){

        this.io.on('connection', this.onConnection)

        this.io.on('connect', this.onConnect)

        this.io.on('load-older-messages', this.onLoadOlderMessages);
    }
    onConnection = (socket : SocketIO.Socket)=> {
        this.checkPermission(socket.handshake.headers).then(()=>  {
            //do something
        }).catch((err)=> {
            //error handling
        })
    }

    onConnect = (socket : SocketIO.Socket)=> {
        this.checkPermission(socket.handshake.headers).then(()=>  {
            //do something
        }).catch((err)=> {
            //error handling
        })
    }

    onLoadOlderMessages = (socket : SocketIO.Socket)=> {
        this.checkPermission(socket.handshake.headers).then(()=>  {
            //do something
        }).catch((err)=> {
            //error handling
        })
    }


    checkPermission(headers : Headers) : Promise<User>{
        //TODO: Check for login, chat _id
        return null;

    }
}