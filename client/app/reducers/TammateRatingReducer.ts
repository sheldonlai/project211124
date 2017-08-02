import {AuthActionTypes} from "../constants/AuthActionTypes";
import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {RatingActionTypes} from "../constants/RatingActionTypes";
import {TeammatePreviewDto} from "../../../server/dtos/rating/TeammatePreviewDto";

export interface TeammateRatingReducerState {
    status : ReducerStateStatus;
    previews: TeammatePreviewDto[];
}

const initialState : TeammateRatingReducerState = {
    status : ReducerStateStatus.LOADING,
    previews : [],

};

const getLoadingState = (state):TeammateRatingReducerState  => {
    let newState = {...state};
    newState.status = ReducerStateStatus.LOADING;
    return newState;
};

export const TeammateRatingReducer = (state = initialState, action) : TeammateRatingReducerState => {
    switch (action.type) {
        case RatingActionTypes.GetTeammateRecordPreviewRequest:
            return getLoadingState(state);
        case RatingActionTypes.GetTeammateRecordPreviewOK:
            state = {...state};
            state.status = ReducerStateStatus.DONE;
            state.previews = action.data;
            return state;
        default:
            return state;
    }
};