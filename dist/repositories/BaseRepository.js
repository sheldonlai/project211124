"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppError_1 = require("../errors/AppError");
var BaseRepository = (function () {
    function BaseRepository(model) {
        this.model = model;
    }
    BaseRepository.prototype.getAll = function (options) {
        var _this = this;
        var promise = this.model.find();
        if (options) {
            promise = (options.sort) ? promise.sort(options.sort) : promise;
            promise = (options.limit) ? promise.limit(options.limit) : promise;
        }
        return promise.lean().exec().then(function (res) {
            return _this.getModels(res);
        });
    };
    BaseRepository.prototype.getById = function (id) {
        var _this = this;
        return this.model.findById(id).lean().exec().then(function (res) {
            return _this.getModel(res);
        });
    };
    BaseRepository.prototype.findOne = function (query) {
        var _this = this;
        return this.model.findOne(query).lean().exec().then(function (res) {
            return _this.getModel(res);
        });
    };
    BaseRepository.prototype.filter = function (query) {
        var _this = this;
        return this.model.find(query).lean().exec().then(function (res) {
            return _this.getModels(res);
        });
    };
    BaseRepository.prototype.create = function (obj) {
        var _this = this;
        delete obj._id;
        return this.model.create(obj).then(function (res) {
            return _this.getModel(res);
        });
    };
    BaseRepository.prototype.update = function (obj) {
        var _this = this;
        return this.model.findByIdAndUpdate(obj._id, obj, { new: true }).exec().then(function (res) {
            return _this.getModel(res);
        });
    };
    BaseRepository.prototype.deleteById = function (id) {
        var _this = this;
        return this.model.findByIdAndRemove(id).exec().then(function (res) {
            return _this.getModel(res);
        });
    };
    BaseRepository.prototype.getModels = function (objs) {
        var _this = this;
        return objs.map(function (obj) {
            return _this.getModel(obj);
        });
    };
    BaseRepository.prototype.getModel = function (obj) {
        var result;
        if (obj == undefined || obj == null) {
            throw new AppError_1.AppError('Entity not found');
        }
        else if (obj.toObject == undefined) {
            result = obj;
        }
        else {
            result = obj.toObject();
        }
        return this.applyRestriction(result);
    };
    BaseRepository.prototype.applyRestriction = function (obj) {
        return obj;
    };
    return BaseRepository;
}());
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map