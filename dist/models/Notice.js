"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var NoticeType_1 = require("../enums/NoticeType");
var RepeatPatternEnum_1 = require("../enums/RepeatPatternEnum");
;
var Notice = (function () {
    function Notice(recipientId, type, message, senderId, pattern) {
        this.recipient = recipientId;
        this.type = type;
        this.message = message;
        this.sender = senderId;
        this.repeatPattern = pattern;
    }
    return Notice;
}());
exports.Notice = Notice;
var schema = new mongoose_1.Schema({
    recipient: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
    type: { type: String, enum: Object.keys(NoticeType_1.NoticeType), required: true },
    repeatPattern: {
        type: { type: String, enum: Object.keys(RepeatPatternEnum_1.RepeatPatternEnum) },
        gap: { type: Number }
    },
    message: { type: String, required: true },
    iconUrl: { type: String }
});
exports.QuestionModel = mongoose_1.model('question', schema);
//# sourceMappingURL=Notice.js.map