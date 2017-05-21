import {User} from './User';
import {model, Schema, Document} from "mongoose";
import {BaseModel} from './BaseModel';

export class ChatMessage {
  message: String;
  sentAt: Date; //MM-DD-YYYY
  sentBy : User;

  constructor(sentBy : User, message : String){
    this.sentBy = sentBy;
    this.message = message;
  }
}


export class ChatHistory extends BaseModel {
   User_A : User;
   User_B: User;
   Messages : ChatMessage[]; // stack 

   constructor (User_A : User, User_B : User){
        super();
        this.User_A = User_A;
        this.User_B = User_B;
        this.Messages = undefined;
   }
}

export interface IChat_history extends ChatHistory, Document{}

export const ChatSchema = new Schema({
    User_A : {type: Schema.Types.ObjectId, ref : 'user', required: true},
    User_B : {type : Schema.Types.ObjectId, ref : 'user', required: true},
    Messages : [{
        meesages : {type : String, required : true},
        sentAt : {type : Date, required : true, default:Date.now},
        sentBy : {type : Schema.Types.ObjectId, ref : 'user', required : true}
    }]
}, {
    timestamps: true
});

// should add pre-save method to ensure local, facebook or google is populated properly

export const ChatModel = model<IChat_history>('ChatHistory', ChatSchema);