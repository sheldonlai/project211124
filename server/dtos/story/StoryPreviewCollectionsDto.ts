import {StoryDto} from "./StoryDto";

export interface StoryPreviewCollectionsDto {
    recommendedPreviews: StoryDto[];
    myStories?: StoryDto[];
}