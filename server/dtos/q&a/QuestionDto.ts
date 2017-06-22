
import {PublicityStatus} from "../../enums/PublicityStatus";
import {QuestionComment} from "../../models/Question";
export class QuestionDto{
    _id : string;
    title : string;
    content : string;
    dateCreated?: Date;
    isPublished : boolean;
    lastEditedUtc : Date;
    tags : any[];
    comments : QuestionComment[];
    publicityStatus:  PublicityStatus;

    constructor() {

    }
}