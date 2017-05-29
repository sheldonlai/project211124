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
var BaseModel_1 = require("./BaseModel");
var ChatMessage = (function () {
    function ChatMessage(sentBy, message) {
        this.sentBy = sentBy;
        this.message = message;
    }
    return ChatMessage;
}());
exports.ChatMessage = ChatMessage;
var ChatHistory = (function (_super) {
    __extends(ChatHistory, _super);
    function ChatHistory(User_A, User_B) {
        var _this = _super.call(this) || this;
        _this.User_A = User_A;
        _this.User_B = User_B;
        _this.Messages = undefined;
        return _this;
    }
    return ChatHistory;
}(BaseModel_1.BaseModel));
exports.ChatHistory = ChatHistory;
exports.ChatSchema = new mongoose_1.Schema({
    User_A: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    User_B: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    Messages: [{
            meesages: { type: String, required: true },
            sentAt: { type: Date, required: true, default: Date.now },
            sentBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true }
        }]
}, {
    timestamps: true
});
// should add pre-save method to ensure local, facebook or google is populated properly
exports.ChatModel = mongoose_1.model('ChatHistory', exports.ChatSchema);
//# sourceMappingURL=Chat_history.js.map