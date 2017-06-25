// /**
//  * Created by Phillip on 2017-05-28.
//  */
//
// import {Document, model, Schema} from "mongoose";
// import {BaseModel} from "../../../server/models/BaseModel";
// import {BaseRepository, IBaseRepository} from "../../../server/repositories/BaseRepository";
// import "mocha";
// import * as chai from "chai";
// import {ObjectID} from "bson";
// import {EntityNotFoundError} from "../../../server/errors/EntityNotFoundError";
// import {UserRepository} from "../../../server/repositories/UserRepository";
// import {FakeModels} from "./helpers/FakeModels";
// import {UserModel} from "../../../server/models/User";
//
// require('source-map-support').install();
//
// let mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// const expect = chai.expect;
//
//
// describe("UserRepositoryTest", function () {
//
//     const repo: UserRepository = new UserRepository;
//
//     before(function(){
//         return mongoose.connect('mongodb://admin:1122312@ds143141.mlab.com:43141/askalot');
//     });
//
//     after(function(){
//         return mongoose.disconnect();
//     });
//
//
//     afterEach(function () {
//         return UserModel.remove({});
//     });
//
//     it("can create", function() {
//         return repo.create(new FakeModels().localUser()).then(
//
//         );
//     });
//
// });
describe('User empty test', function () {
    test('should pass', function () {
        expect.anything();
    });
});
//# sourceMappingURL=UserRepositoryTest.js.map