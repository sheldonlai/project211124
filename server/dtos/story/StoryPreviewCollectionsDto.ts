import {StoryPreviewDto} from "./StoryPreviewDto";

export interface StoryPreviewCollectionsDto {
    recommendedPreviews: StoryPreviewDto[];
    myStories?: StoryPreviewDto[];
}