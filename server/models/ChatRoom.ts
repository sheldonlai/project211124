import {Document, model, Schema} from "mongoose";
import {User} from "./User";
import {esClient} from "../esClient";
let mongoosastic = require("mongoosastic");

export interface ChatMessage{
    _id: any;
    content: string;
    sentBy: User;
    sentTo: User;
    sentAt: Date;
}

export class ChatRoom{
    _id: any;
    users: User[];
    messageLog: ChatMessage[];

    constructor(userA?: User, userB?: User){
        this.users = [userA, userB];
        this.messageLog = [];
    }
}

export interface IChatRoom extends ChatRoom, Document {}

const schema = new Schema({
    users: [{type: Schema.Types.ObjectId, ref: "user", required: true}],
    messageLog: [{
        content: {type: String, required: true, default: ""},
        sentBy: {type: Schema.Types.ObjectId, ref: "user", required: true},
        sentTo: {type: Schema.Types.ObjectId, ref: "user", required: true},
        sentAt: {type: Date, required: true, default: Date.now()}
    }]
});

const autoPopulateUsers = function(next) {
    this.populate(["users", "messageLog.sentBy", "messageLog.sentTo"]);
    next();
};

schema.pre('findOne', autoPopulateUsers).pre('find', autoPopulateUsers);
schema.plugin(mongoosastic, {
    populate: [
        {path: "users", select: 'username'},
        {path: "messageLog.sentBy", select: 'username'},
        {path: "messageLog.sentTo", select: 'username'}
    ],
    esClient
});

export const ChatRoomModel = model<IChatRoom>('chatRoom', schema);



