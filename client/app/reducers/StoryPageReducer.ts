import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {RatingActionTypes} from "../constants/RatingActionTypes";
import {TeammatePreviewDto} from "../../../server/dtos/rating/TeammatePreviewDto";
import {FrontEndStoryModels} from "../models/StoryModels";
import StoryPreview = FrontEndStoryModels.StoryPreview;
import {StoryActionTypes} from "../constants/StoryActionTypes";
import Story = FrontEndStoryModels.Story;

export interface StoryPageReducerState {
    status : ReducerStateStatus;
    story: Story;
}

const initialState : StoryPageReducerState = {
    status : ReducerStateStatus.LOADING,
    story: undefined
};

const getLoadingState = (state): StoryPageReducerState  => {
    let newState = {...state};
    newState.status = ReducerStateStatus.LOADING;
    return newState;
};

export const StoryPageReducer = (state = initialState, action) : StoryPageReducerState => {
    switch (action.type) {
        case StoryActionTypes.FetchStoryPageRequest:
        return getLoadingState(state);
        case StoryActionTypes.FetchStoryPageOK:
            state = {...state};
            state.status = ReducerStateStatus.DONE;
            state.story = action.data;
            return state;
        case StoryActionTypes.EditStoryRequest:
            return getLoadingState(state);
        case StoryActionTypes.EditStoryOK:
            state = {...state};
            state.status = ReducerStateStatus.DONE;
            state.story = action.data;
            return state;
        default:
            return state;
    }
};