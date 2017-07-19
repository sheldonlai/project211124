import {UserDto} from "../auth/UserDto";
/**
 * Created by SHELDON on 6/24/2017.
 */
export interface CommentDto {
    commentBy: UserDto;
    commentContent: string;
    lastEditedUtc: Date;
    commentedDate: Date;
}