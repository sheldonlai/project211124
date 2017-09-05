import {QuestionDto} from "../q&a/QuestionDto";
import {StoryDto} from "../story/StoryDto";
import {SearchScoreModel} from "../../models/Base/SearchScoreModel";

export interface DashboardDto {
    stories: SearchScoreModel<StoryDto>[];
    questions: SearchScoreModel<QuestionDto>[];
}