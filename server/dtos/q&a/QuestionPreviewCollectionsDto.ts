import {QuestionDto} from "./QuestionDto";

/**
 * Created by SHELDON on 6/24/2017.
 */
export interface QuestionPreviewCollectionsDto {
    featuredQuestions: QuestionDto[];
    myQuestions: QuestionDto[];
}