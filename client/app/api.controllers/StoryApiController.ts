import {RawDraftContentState, EditorState, convertFromRaw, convertToRaw} from "draft-js";

import {ApiController} from "./ApiController";
import {APIUrls} from "../../../server/urls";
import {FrontEndStoryModels} from "../models/StoryModels";
import Story = FrontEndStoryModels.Story;
import {AxiosPromise, AxiosResponse} from "axios";
import {StoryDto} from "../../../server/dtos/story/StoryDto";
import {CommentDto} from "../../../server/dtos/q&a/CommentDto";
import {StoryPreviewCollectionsDto} from "../../../server/dtos/story/StoryPreviewCollectionsDto";
import {StoryPreviewDto} from "../../../server/dtos/story/StoryPreviewDto";
import StoryPreview = FrontEndStoryModels.StoryPreview;

export class StoryApiControllerClass extends ApiController {
    constructor() {
        super();
    }

    getStoryPreviews(): AxiosPromise {
        return this.get(APIUrls.getStoryPreviews).then((response) => {
            let collection: StoryPreviewCollectionsDto = response.data;
            if (collection.recommendedPreviews.length > 0)
                response.data.recommendedPreviews = collection.recommendedPreviews.map((story) =>
                    StoryPreview.fromStoryPreviewDto(story));
            if (collection.myStories.length > 0)
                response.data.myStories = collection.myStories.map((story) =>
                    StoryPreview.fromStoryPreviewDto(story));

            return response;
        });
    }

    getStoryById(id: string) {
        return this.get(APIUrls.getStory.replace(":id", id)).then((response) => {
            response.data = this.convertDtoToStory(response.data);
            return response;
        });
    }

    createStory(story: Story): AxiosPromise {
        return this.storyPostApiHelper(APIUrls.createStory, story);
    }

    updateStory(story: Story): AxiosPromise {
        return this.storyPutApiHelper(APIUrls.updateStory, story);
    }

    addComment(comment: CommentDto, storyId: string): AxiosPromise {
        return this.post(APIUrls.createStoryComment.replace(":id", storyId), comment)
            .then((response: AxiosResponse) => {
                response.data = this.convertDtoToStory(response.data);
                return response;
            });
    }

    updateComment(comment: CommentDto, storyId: string): AxiosPromise {
        return this.put(APIUrls.updateStoryComment.replace(":id", storyId), comment)
            .then((response: AxiosResponse) => {
                response.data = this.convertDtoToStory(response.data);
                return response;
            });
    }

    upVoteStory(story: Story): AxiosPromise {
        return this.storyPutApiHelper(APIUrls.UpVoteStory, story);
    }

    downVoteStory(story: Story): AxiosPromise {
        return this.storyPutApiHelper(APIUrls.DownVoteStory, story);
    }

    private storyPutApiHelper(url: string, story: Story): AxiosPromise {
        const storyDto = this.convertStoryToDto(story);
        return this.put(url, storyDto).then((response: AxiosResponse) => {
            response.data = this.convertDtoToStory(response.data);
            return response;
        });
    }

    private storyPostApiHelper(url: string, story: Story): AxiosPromise {
        const storyDto = this.convertStoryToDto(story);
        return this.post(url, storyDto).then((response: AxiosResponse) => {
            response.data = this.convertDtoToStory(response.data);
            return response;
        });
    }

    private convertStoryToDto(story: Story) {
        let storyDto: StoryDto = <any>{...story};
        storyDto.content = this.convertEditorStateToRaw(story.content);
        return storyDto;
    }

    private convertDtoToStory(storyDto: StoryDto): Story {
        let story: Story = <any>storyDto;
        story.content = this.convertRawToEditorState(storyDto.content);
        return story;
    }


    private convertRawToEditorState(rawState: RawDraftContentState): EditorState {
        if (!rawState.entityMap) rawState.entityMap = {};
        const content = convertFromRaw(rawState);
        return EditorState.createWithContent(content);
    }

    private convertRawToText(rawState: RawDraftContentState): string {
        if (!rawState.entityMap) rawState.entityMap = {};
        const content = convertFromRaw(rawState);
        return content.getPlainText();
    }

    private convertEditorStateToRaw(editorState: EditorState): RawDraftContentState {
        let content = editorState.getCurrentContent();
        return convertToRaw(content);
    }
}

export const StoryApiController = new StoryApiControllerClass();