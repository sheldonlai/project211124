/**
 * Created by SHELDON on 6/3/2017.
 */
import {RawDraftContentState} from "draft-js";
import {UserDto} from "../auth/UserDto";
export interface QuestionPreviewDto {
    _id: any;
    title : string;
    content : string;
    author: UserDto;
    createdUtc: Date;
}