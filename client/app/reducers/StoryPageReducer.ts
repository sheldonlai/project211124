import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {RatingActionTypes} from "../constants/RatingActionTypes";
import {TeammatePreviewDto} from "../../../server/dtos/rating/TeammatePreviewDto";
import {FrontEndStoryModels} from "../models/StoryModels";
import StoryPreview = FrontEndStoryModels.StoryPreview;
import {StoryActionTypes} from "../constants/StoryActionTypes";
import Story = FrontEndStoryModels.Story;

export interface StoryPageReducerState {
    status: ReducerStateStatus;
    commentStatus: ReducerStateStatus;
    story: Story;
}

const initialState: StoryPageReducerState = {
    status: ReducerStateStatus.LOADING,
    commentStatus: ReducerStateStatus.NONE,
    story: undefined
};

const getLoadingState = (state): StoryPageReducerState => {
    let newState = {...state};
    newState.status = ReducerStateStatus.LOADING;
    return newState;
};

const getCommentLoadingState = (state): StoryPageReducerState => {
    let newState = {...state};
    newState.commentStatus = ReducerStateStatus.LOADING;
    return newState;
};

const changeOkState = (state, story: Story) => {
    state = {...state};
    state.status = ReducerStateStatus.DONE;
    state.story = story;
    state.commentStatus = ReducerStateStatus.DONE;
    return state;
};

export const StoryPageReducer = (state = initialState, action): StoryPageReducerState => {
    switch (action.type) {
        case StoryActionTypes.FetchStoryPageRequest:
            return getLoadingState(state);
        case StoryActionTypes.FetchStoryPageOK:
            return changeOkState(state, action.data);

        case StoryActionTypes.EditStoryRequest:
            return getLoadingState(state);
        case StoryActionTypes.EditStoryOK:
            return changeOkState(state, action.data);

        case StoryActionTypes.CreateStoryCommentRequest:
            return getCommentLoadingState(state);
        case StoryActionTypes.CreateStoryCommentOK:
            return changeOkState(state, action.data);

        case StoryActionTypes.UpdateStoryCommentRequest:
            return getCommentLoadingState(state);
        case StoryActionTypes.UpdateStoryCommentOK:
            return changeOkState(state, action.data);

        default:
            return state;
    }
};