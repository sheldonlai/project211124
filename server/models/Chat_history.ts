import {User} from './User';

export class Chat_history extends User {
   User_A : User;
   User_B: User;
   Message : String
}

export interface IChat_history extends Chat_history, Document{}

export const Chat_schema = new Schema({
    User_A = {type : User, required: true, unique: true},
    User_B = {type : User, required: true, unique: true},
    Message = {type : String, required : false},
}, {
    timestamps: true
});

// should add pre-save method to ensure local, facebook or google is populated properly

export const ChatModel = model<IChat_history>('Chat_history', Chat_schema);



