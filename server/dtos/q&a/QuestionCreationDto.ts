import {QuestionDifficulty} from "../../models/Question";
import {PublicityStatus} from "../../enums/PublicityStatus";
export interface QuestionCreationDto{
    title : string;
    author: string;
    content : string;
    isPublished : boolean;
    tags : any[];
    publicityStatus:  PublicityStatus;
    difficulty: QuestionDifficulty;
}