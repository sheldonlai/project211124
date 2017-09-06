import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {RatingActionTypes} from "../constants/action.types/RatingActionTypes";
import {TeammatePreviewDto} from "../../../server/dtos/rating/TeammatePreviewDto";
import {FrontEndStoryModels} from "../models/StoryModels";
import StoryPreview = FrontEndStoryModels.StoryPreview;
import {StoryActionTypes} from "../constants/action.types/StoryActionTypes";
import Story = FrontEndStoryModels.Story;

export interface StyleReducerState {
    status : ReducerStateStatus;
    story: Story;
}

const initialState : StyleReducerState = {
    status : ReducerStateStatus.LOADING,
    story: undefined
};

const getLoadingState = (state): StyleReducerState  => {
    let newState = {...state};
    newState.status = ReducerStateStatus.LOADING;
    return newState;
};

export const StyleReducer = (state = initialState, action) : StyleReducerState => {
    switch (action.type) {
        default:
            return state;
    }
};