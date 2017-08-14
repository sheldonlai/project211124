import {StoryActionTypes} from '../constants/StoryActionTypes';
import {StoryApiController, StoryApiControllerClass} from '../api.controllers/StoryAPIController';
import {BaseActions} from "./BaseActions";
import {AxiosResponse} from "axios";
import {FrontEndStoryModels} from "../models/StoryModels";
import Story = FrontEndStoryModels.Story;
import {RouterController} from "../api.controllers/RouterController";
import {Routes} from "../constants/Routes";
import {CommentDto} from "../../../server/dtos/q&a/CommentDto";

let apiController: StoryApiControllerClass = StoryApiController;

export class StoryActions extends BaseActions {

    static getStoryPreviews(): (dispatch: any) => void {
        return function (dispatch) {
            apiController.getStoryPreviews().then((res: AxiosResponse) => {
                dispatch({
                    type: StoryActionTypes.StoryPreviewsOK,
                    data: res.data
                })
            }).catch(err => {
                StoryActions.handleError(dispatch, err, StoryActionTypes.StoryPreviewsError)
            });
        }
    }

    static createStory(storyReq: Story): (dispatch: any) => void {
        console.log('was here');
        return function (dispatch) {
            apiController.createStory(storyReq).then(res => {
                dispatch({
                    type: StoryActionTypes.StoryCreated,
                    data: res.data
                });
                RouterController.history.push(Routes.story);
            }).catch(err =>
                StoryActions.handleError(dispatch, err, StoryActionTypes.CreateStoryError)
            )
        }
    }

    static updateStory(story: Story): any {
        return function(dispatch) {
            dispatch({
                type: StoryActionTypes.EditStoryRequest,
            });
            apiController.updateStory(story).then(res => {
                dispatch({
                    type: StoryActionTypes.EditStoryOK,
                    data: res.data
                });
            }).catch(err =>
                StoryActions.handleError(dispatch, err, StoryActionTypes.EditStoryError)
            )
        }
    }

    static fetchStoryPage(id: string) {
        return function (dispatch) {
            dispatch({
                type: StoryActionTypes.FetchStoryPageRequest
            });
            apiController.getStoryById(id).then(res => {
                dispatch({
                    type: StoryActionTypes.FetchStoryPageOK,
                    data: res.data
                });
            }).catch(err =>
                StoryActions.handleError(dispatch, err, StoryActionTypes.FetchStoryPageError)
            )
        }
    }

    static createComment(comment: CommentDto, storyId: string){
        return (dispatch) => {
            apiController.addComment(comment, storyId).then(res => {
                dispatch({
                    type: StoryActionTypes.CreateStoryComment,
                    data: res.data
                });
            }).catch(err =>
                StoryActions.handleError(dispatch, err, StoryActionTypes.CreateStoryCommentError)
            )
        }
    }

    static updateComment(updatedComment: CommentDto, storyId: string){
        return (dispatch) => {
            apiController.updateComment(updatedComment, storyId).then(res => {
                dispatch({
                    type: StoryActionTypes.UpdateStoryComment,
                    data: res.data,
                });
            }).catch(err =>
                StoryActions.handleError(dispatch, err, StoryActionTypes.UpdateStoryCommentError)
            )
        }
    }

    static upVoteStory(story: Story) {
        return (dispatch) => {
            apiController.upVoteStory(story).then(res => {
                dispatch({
                    type: StoryActionTypes.UpVoteStory,
                    data: res.data
                });
            }).catch(err =>
                StoryActions.handleError(dispatch, err, StoryActionTypes.StoryPageError)
            )
        }
    }

    static downVoteStory(story: Story) {
        return (dispatch) => {
            apiController.downVoteStory(story).then(res => {
                dispatch({
                    type: StoryActionTypes.DownVoteStory,
                    data: res.data
                });
            }).catch(err =>
                StoryActions.handleError(dispatch, err, StoryActionTypes.StoryPageError)
            )
        }
    }

}