/**
 * Created by Phillip on 2017-05-20.
 */

import {Document, model, Schema} from "mongoose";
import {BaseModel} from "../../../server/models/BaseModel";
import {BaseRepository, IBaseRepository} from "../../../server/repositories/BaseRepository";
import "reflect-metadata";
import "mocha";
import * as chai from "chai";

require('source-map-support').install();

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const expect = chai.expect;

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

    before(function(){
        return mongoose.connect('mongodb://admin:1122312@ds143141.mlab.com:43141/askalot');
    });

    after(function(){
        return mongoose.disconnect();
    });

    /* Clean the repository before each test to ensure
       they don't depend on each other .
     */
    beforeEach(function () {
        return TestSchemaModel.remove({});
    });

    describe("test getAll method", function() {

        it("should return empty array when repo is not populated", function() {
            repo.getAll().then(function(arr) {
                expect(arr).to.be.empty
            })
        });

        it("should return all stored entities in repo, function()", function() {
            let testModel1: TestModel = new TestModel(1);
            let testModel2: TestModel = new TestModel(2);
            let created1 = repo.create(testModel1);
            let created2 = repo.create(testModel2);
            repo.getAll().then(function(arr) {
                expect(arr).to.have.lengthOf(2);
            })
        })

    })



});