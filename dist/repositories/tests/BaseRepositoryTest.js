"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var BaseModel_1 = require("../../models/BaseModel");
var BaseRepository_1 = require("../BaseRepository");
var bson_1 = require("bson");
require('source-map-support').install();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var TestModel = (function (_super) {
    __extends(TestModel, _super);
    function TestModel(age) {
        var _this = _super.call(this) || this;
        _this.age = age;
        return _this;
    }
    return TestModel;
}(BaseModel_1.BaseModel));
var schema = new mongoose_1.Schema({ age: Number });
var TestSchemaModel = mongoose_1.model('test', schema);
var TestRepository = (function (_super) {
    __extends(TestRepository, _super);
    function TestRepository() {
        return _super.call(this, TestSchemaModel) || this;
    }
    return TestRepository;
}(BaseRepository_1.BaseRepository));
describe("BaseRepositoryTest", function () {
    var repo = new TestRepository;
    beforeAll(function () {
        return mongoose.connect('mongodb://admin:1122312@ds143141.mlab.com:43141/askalot');
    });
    afterAll(function () {
        return mongoose.disconnect();
    });
    /* Clean the repository before each test to ensure
       they don't depend on each other .
     */
    beforeEach(function () {
        return TestSchemaModel.remove({});
    });
    describe("test getAll method", function () {
        it("should return empty array when repo is not populated", function () {
            return repo.getAll().then(function (arr) {
                expect(arr.length).toBe(0);
                return;
            });
        });
        it("should return all stored entities in repo, function()", function () {
            var testModel1 = new TestModel(1);
            var testModel2 = new TestModel(2);
            var createPromises = [repo.create(testModel1), repo.create(testModel2)];
            return Promise.all(createPromises).then(function () {
                return repo.getAll();
            }).then(function (arr) {
                expect(arr.length).toBe(2);
                return;
            });
        });
    });
    describe("test getById method", function () {
        it("should throw exception when entity is not found ", function () {
            expect.assertions(1);
            var objectId = new bson_1.ObjectID();
            return repo.getById(objectId).then(function () {
                return;
            }).catch(function (err) {
                expect(err.name).toBe("AppError");
                return;
            });
        });
        it("should return the correct entity when id is an objectID", function () {
            var testModel = new TestModel(1);
            return repo.create(testModel).then(function (created) {
                return repo.getById(created._id);
            }).then(function (model) {
                expect(model.age).toBe(testModel.age);
                return;
            });
        });
        it("should return the correct entity when id is a string", function () {
            var testModel = new TestModel(1);
            return repo.create(testModel).then(function (created) {
                return repo.getById(created._id.toString());
            }).then(function (model) {
                expect(model.age).toBe(testModel.age);
                return;
            });
        });
    });
    describe("test findOne method", function () {
        it("should throw exception if no entity matches the given query predicates", function () {
            expect.assertions(1);
            return repo.findOne({ age: 50 }).catch(function (err) {
                expect(err.name).toBe("AppError");
                return;
            });
        });
        it("should return entity that match the query predicates", function () {
            var testModel1 = new TestModel(20);
            var testModel2 = new TestModel(20);
            var createPromises = [repo.create(testModel1), repo.create(testModel2)];
            return Promise.all(createPromises).then(function () {
                var query = { age: 20 };
                return repo.findOne(query);
            }).then(function (model) {
                expect(model.age).toBe(20);
                return;
            });
        });
    });
    describe("test filter method", function () {
        it("should return entities that matches the query predicates", function () {
            var testModel1 = new TestModel(10);
            var testModel2 = new TestModel(18);
            var testModel3 = new TestModel(45);
            var createPromises = [repo.create(testModel1), repo.create(testModel2), repo.create(testModel3)];
            return Promise.all(createPromises).then(function () {
                var query = { age: { $lt: 20 } };
                return repo.filter(query);
            }).then(function (arr) {
                var ages = arr.map(function (model) { return model.age; });
                expect(ages.length).toBe(2);
                expect(ages).toEqual(expect.arrayContaining([testModel1.age]));
                expect(ages).toEqual(expect.arrayContaining([testModel2.age]));
                return;
            });
        });
    });
    describe("test create method", function () {
        it("should create an entity in the repo if _id is null", function () {
            var testModel = new TestModel(1);
            return repo.create(testModel).then(function (created) {
                return repo.getById(created._id);
            }).then(function (model) {
                expect(model.age).toBe(testModel.age);
                return;
            });
        });
        it("should re-assign a new _id during creation if _id is not null", function () {
            var testModel = new TestModel(1);
            testModel._id = new bson_1.ObjectID();
            return repo.create(testModel).then(function () {
                return repo.getAll();
            }).then(function (arr) {
                expect(arr[0]._id).not.toEqual(testModel._id);
                expect(arr[0].age).toBe(testModel.age);
                return;
            });
        });
    });
    describe("test update method", function () {
        it("should throw exception if no entity matches the given id", function () {
            var testModel = new TestModel(1);
            testModel._id = new bson_1.ObjectID();
            expect.assertions(1);
            return repo.update(testModel).catch(function (err) {
                expect(err.name).toBe("AppError");
                return;
            });
        });
        it("should update the matched entity and return the updated model", function () {
            var testModel = new TestModel(1);
            return repo.create(testModel).then(function (created) {
                testModel = created;
                created.age = 100;
                return repo.update(created);
            }).then(function (updated) {
                expect(updated._id).toEqual(testModel._id);
                expect(updated.age).toBe(100);
                return repo.getById(updated._id);
            }).then(function (model) {
                expect(model.age).toBe(100);
            });
        });
    });
    describe("test deleteById method", function () {
        it("should throw exception if no entity matches the given id", function () {
            var objectId = new bson_1.ObjectID();
            expect.assertions(1);
            return repo.deleteById(objectId).catch(function (err) {
                expect(err.name).toBe("AppError");
                return;
            });
        });
        it("should delete and return the entity that matches the given id", function () {
            var testModel = new TestModel(1);
            return repo.create(testModel).then(function (created) {
                testModel = created;
                return repo.deleteById(created._id);
            }).then(function (deleted) {
                expect(deleted._id).toEqual(testModel._id);
                expect(deleted.age).toBe(testModel.age);
                return repo.getAll();
            }).then(function (arr) {
                expect(arr.length).toBe(0);
                return;
            });
        });
    });
});
//# sourceMappingURL=BaseRepositoryTest.js.map