import {config} from "../../../config";
import {MongooseThenable} from "mongoose";

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

export class TestDatabase {

    constructor() {}

    connect(): MongooseThenable  {
        return mongoose.connect(config.testDatabase.URI);
    }

    disconnect(): MongooseThenable {
        return mongoose.disconnect();
    }

}
