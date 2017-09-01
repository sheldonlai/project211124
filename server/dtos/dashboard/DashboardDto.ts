import {QuestionPreviewDto} from "../q&a/QuestionPreviewDto";
import {StoryPreviewDto} from "../story/StoryPreviewDto";
import {Question} from "../../models/Question";
import {Story} from "../../models/Story";

export interface DashboardDto {
    stories: Story[];
    questions: Question[];

}