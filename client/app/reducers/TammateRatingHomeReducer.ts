import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {RatingActionTypes} from "../constants/action.types/RatingActionTypes";
import {TeammatePreviewDto} from "../../../server/dtos/rating/TeammatePreviewDto";

export interface RatingHomeReducerState {
    status : ReducerStateStatus;
    previews: TeammatePreviewDto[];
}

const initialState : RatingHomeReducerState = {
    status : ReducerStateStatus.LOADING,
    previews : [],

};

const getLoadingState = (state):RatingHomeReducerState  => {
    let newState = {...state};
    newState.status = ReducerStateStatus.LOADING;
    return newState;
};

export const RatingHomeReducer = (state = initialState, action) : RatingHomeReducerState => {
    switch (action.type) {
        case RatingActionTypes.GetTeammateRecordPreviewRequest:
            return getLoadingState(state);
        case RatingActionTypes.GetTeammateRecordPreviewOK:
            state = {...state};
            state.status = ReducerStateStatus.DONE;
            state.previews = action.data;
            return state;

        case RatingActionTypes.BlurrySearchPreviewRequest:
            return getLoadingState(state);
        case RatingActionTypes.BlurrySearchPreviewOK:
            state = {...state};
            state.status = ReducerStateStatus.DONE;
            state.previews = action.data;

        default:
            return state;
    }
};