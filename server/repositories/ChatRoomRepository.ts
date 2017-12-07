import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {ChatRoom, ChatRoomModel, IChatRoom} from "../models/ChatRoom";

export interface IChatRoomRepository extends IBaseRepository<ChatRoom>{}

export class ChatRoomRepository extends BaseRepository<ChatRoom, IChatRoom> implements IChatRoomRepository{
    constructor(){
        super(ChatRoomModel);
    }
}