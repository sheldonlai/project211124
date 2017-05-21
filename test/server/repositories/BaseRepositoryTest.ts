/**
 * Created by Phillip on 2017-05-20.
 */

import {model, Schema, Document} from "mongoose";
import {BaseModel} from "../../../server/models/BaseModel";
import {BaseRepository, IBaseRepository} from "../../../server/repositories/BaseRepository";
import 'reflect-metadata'
import 'mocha'
import * as chai from 'chai';

require('source-map-support').install();

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:1122312@ds143141.mlab.com:43141/askalot');

class TestModel extends BaseModel {
    age: number;
    constructor(age: number){super(); this.age = age;}
}
interface ITestModel extends TestModel, Document {}
const schema = new Schema({age: String});
const TestSchemaModel = model<ITestModel>('test', schema);
interface ITestRepository extends IBaseRepository<TestModel> {}
class TestRepository extends BaseRepository<TestModel, ITestModel> implements ITestRepository{
    constructor() {
        super(TestSchemaModel)
    }
}

describe("BaseRepositoryTest", function () {
    
    const repo: TestRepository = new TestRepository;

    /* Clean the repository before each test to ensure
       they don't depend on each other .
     */
    beforeEach(function () {
        return TestSchemaModel.remove({});
    });

    it("should work", function() {

    })

};