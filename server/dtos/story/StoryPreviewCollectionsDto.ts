import {StoryDto} from "./StoryDto";
import {StoryPreviewDto} from "./StoryPreviewDto";

export interface StoryPreviewCollectionsDto {
    recommendedPreviews: StoryPreviewDto[];
    myStories?: StoryPreviewDto[];
}