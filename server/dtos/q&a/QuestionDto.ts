
import {PublicityStatus} from "../../enums/PublicityStatus";
import {QuestionComment, QuestionDifficulty} from "../../models/Question";

export class QuestionDto{
    _id : string;
    title : string;
    author: string;
    content : string;
    dateCreated?: Date;
    isPublished : boolean;
    lastEditedUtc : Date;
    tags : any[];
    comments : QuestionComment[];
    publicityStatus:  PublicityStatus;
    difficulty: QuestionDifficulty;

    constructor() {

    }
}