import {PublicityStatus} from "../../enums/PublicityStatus";
import {QuestionComment, QuestionDifficulty} from "../../models/Question";
import {UserDto} from "../auth/UserDto";

export class QuestionDto{
    _id : string;
    title : string;
    author: UserDto;
    content : string;
    createdUtc?: Date;
    isPublished : boolean;
    lastEditedUtc? : Date;
    tags : any[];
    comments : QuestionComment[];
    publicityStatus:  PublicityStatus;
    difficulty: QuestionDifficulty;

    constructor() {

    }
}