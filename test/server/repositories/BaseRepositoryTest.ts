import {Document, model, Schema} from "mongoose";
import {BaseModel} from "../../../server/models/BaseModel";
import {BaseRepository, IBaseRepository} from "../../../server/repositories/BaseRepository";
import "mocha";
import * as chai from "chai";
import {ObjectID} from "bson";

require('source-map-support').install();

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const expect = chai.expect;

class TestModel extends BaseModel {
    age: number;
    constructor(age: number){super(); this.age = age;}
}
interface ITestModel extends TestModel, Document {}
const schema = new Schema({age: Number});
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
            return repo.getAll().then(function(arr) {
                expect(arr).to.be.empty;
                return;
            });
        });

        it("should return all stored entities in repo, function()", function() {
            let testModel1: TestModel = new TestModel(1);
            let testModel2: TestModel = new TestModel(2);
            let createPromises = [repo.create(testModel1), repo.create(testModel2)];
            return Promise.all(createPromises).then(function() {
                return repo.getAll();
            }).then(function(arr) {
                expect(arr).to.have.lengthOf(2);
                return;
            });
        })
    });

    describe("test getById method", function() {
        it("should throw exception when entity is not found ", function() {
            let error_msg = "fail expected but actually passed";
            let objectId = new ObjectID();
            return repo.getById(objectId).then(function() {
                expect.fail(error_msg);
                return;
            }).catch(function(err) {
                expect(err.name).to.equal("AppError");
                return;
            })
        });

        it("should return the correct entity when id is an objectID", function() {
            let testModel: TestModel = new TestModel(1);
            return repo.create(testModel).then(function(created) {
                return repo.getById(created._id);
            }).then(function(model) {
                expect(model.age).to.equal(testModel.age);
                return;
            });
        });

        it("should return the correct entity when id is a string", function() {
            let testModel: TestModel = new TestModel(1);
            return repo.create(testModel).then(function(created) {
                return repo.getById(created._id.toString());
            }).then(function(model) {
                expect(model.age).to.equal(testModel.age);
                return;
            });
        })
    });

    describe("test findOne method", function() {
        it("should throw exception if no entity matches the given query predicates", function() {
            let error_msg = "fail expected but actually passed";
            return repo.findOne({age: 50}).then(function() {
                expect.fail(error_msg);
                return
            }).catch(function(err) {
                expect(err.name).to.equal("AppError");
                return;
            })
        });

       it("should return entity that match the query predicates", function() {
           let testModel1: TestModel = new TestModel(20);
           let testModel2: TestModel = new TestModel(20);
           let createPromises = [repo.create(testModel1), repo.create(testModel2)];
           return Promise.all(createPromises).then(function() {
               let query = { age: 20 };
               return repo.findOne(query);
           }).then(function(model) {
               expect(model.age).to.equal(20);
               return;
           })
       })
    });

    describe("test filter method", function() {
        it("should return entities that matches the query predicates", function() {
            let testModel1: TestModel = new TestModel(10);
            let testModel2: TestModel = new TestModel(18);
            let testModel3: TestModel = new TestModel(45);
            let createPromises = [repo.create(testModel1), repo.create(testModel2), repo.create(testModel3)];
            return Promise.all(createPromises).then(function() {
                let query = { age: { $lt: 20 }};
                return repo.filter(query);
            }).then(function(arr) {
                let ages = arr.map(function(model) { return model.age} );
                expect(ages).to.have.lengthOf(2);
                expect(ages).contains(testModel1.age);
                expect(ages).contains(testModel2.age);
                return;
            })
        })
    });

    describe("test create method", function() {
        it("should create an entity in the repo if _id is null", function() {
            let testModel = new TestModel(1);
            return repo.create(testModel).then(function(created) {
                return repo.getById(created._id);
            }).then(function(model) {
                expect(model.age).to.equal(testModel.age);
                return;
            })
        });

        it("should re-assign a new _id during creation if _id is not null", function() {
            let testModel = new TestModel(1);
            testModel._id = new ObjectID();
            return repo.create(testModel).then(function() {
                return repo.getAll()
            }).then(function(arr) {
                expect(arr[0]._id).to.not.eql(testModel._id);
                expect(arr[0].age).to.equal(testModel.age);
                return;
            })
        });
    });

    describe("test update method", function() {
        it("should throw exception if no entity matches the given id", function() {
            let testModel = new TestModel(1);
            testModel._id = new ObjectID();
            let error_msg = "fail expected but actually passed";
            return repo.update(testModel).then(function() {
                expect.fail(error_msg);
                return
            }).catch(function(err) {
                expect(err.name).to.equal("AppError");
                return;
            })
        });

        it("should update the matched entity and return the updated model", function() {
            let testModel = new TestModel(1);
            return repo.create(testModel).then(function(created) {
                testModel = created;
                created.age = 100;
                return repo.update(created);
            }).then(function(updated) {
                expect(updated._id).eql(testModel._id);
                expect(updated.age).to.equal(100);
                return repo.getById(updated._id);
            }).then(function(model) {
                expect(model.age).to.equal(100);
            })
        });
    });

    describe("test deleteById method", function() {
        it("should throw exception if no entity matches the given id", function() {
           let objectId = new ObjectID();
           let error_msg = "fail expected but actually passed";
           return repo.deleteById(objectId).then(function() {
               expect.fail(error_msg);
               return
           }).catch(function(err) {
               expect(err.name).to.equal("AppError");
               return;
           })
        });

        it("should delete and return the entity that matches the given id", function() {
            let testModel = new TestModel(1);
            return repo.create(testModel).then(function(created) {
                testModel = created;
                return repo.deleteById(created._id);
            }).then(function(deleted) {
                expect(deleted._id).eql(testModel._id);
                expect(deleted.age).to.equal(testModel.age);
                return repo.getAll();
            }).then(function(arr) {
                expect(arr).to.be.empty;
                return;
            })
        });
    })
});