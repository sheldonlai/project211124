import {StoryDto} from "../story/StoryDto";
import {SearchScoreModel} from "../../models/Base/SearchScoreModel";
import {QuestionPreviewDto} from "../q&a/QuestionPreviewDto";
import {StoryPreviewDto} from "../story/StoryPreviewDto";

export interface DashboardDto {
    stories: SearchScoreModel<StoryPreviewDto>[];
    questions: SearchScoreModel<QuestionPreviewDto>[];
}