/**
 * Created by SHELDON on 6/3/2017.
 */
import {RawDraftContentState} from "draft-js";
export interface QuestionPreviewDto {
    _id: any;
    title : string;
    content : RawDraftContentState;
    author: string;
    createdUtc: Date;
    answered: boolean;
}