import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {RatingActionTypes} from "../constants/action.types/RatingActionTypes";
import {TeammatePreviewDto} from "../../../server/dtos/rating/TeammatePreviewDto";
import {FrontEndStoryModels} from "../models/StoryModels";
import StoryPreview = FrontEndStoryModels.StoryPreview;
import {StoryActionTypes} from "../constants/action.types/StoryActionTypes";

export interface StoryHomeReducerState {
    status : ReducerStateStatus;
    previews: StoryPreview[];
    myPreviews: StoryPreview[];
}

const initialState : StoryHomeReducerState = {
    status : ReducerStateStatus.LOADING,
    previews : [],
    myPreviews: []

};

const getLoadingState = (state):StoryHomeReducerState  => {
    let newState = {...state};
    newState.status = ReducerStateStatus.LOADING;
    return newState;
};

export const StoryHomeReducer = (state = initialState, action) : StoryHomeReducerState => {
    switch (action.type) {
        case StoryActionTypes.StoryPreviewsRequest:
            return getLoadingState(state);
        case StoryActionTypes.StoryPreviewsOK:
            state = {...state};
            state.status = ReducerStateStatus.DONE;
            state.previews = action.data.myStories;
            state.myPreviews = action.data.myStories;
            return state;
        default:
            return state;
    }
};