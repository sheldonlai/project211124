import {QuestionDifficulty} from "../../models/Question";
import {PublicityStatus} from "../../enums/PublicityStatus";
export interface QuestionCreationDto{
    title : string;
    author: string;
    content : any;
    isPublished : boolean;
    tags : any[];
    publicityStatus:  PublicityStatus;
    difficulty: QuestionDifficulty;
}