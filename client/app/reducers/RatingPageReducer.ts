import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {RatingActionTypes} from "../constants/RatingActionTypes";
import {TeammateRecordDto} from "../../../server/dtos/rating/TeammateRecordDto";

export interface RatingPageReducerState {
    status : ReducerStateStatus;
    record: TeammateRecordDto;
    lastUpdated: number;
}

const initialState : RatingPageReducerState = {
    status : ReducerStateStatus.LOADING,
    record : undefined,
    lastUpdated: 0
};

const getLoadingState = (state):RatingPageReducerState  => {
    let newState = {...state};
    newState.status = ReducerStateStatus.LOADING;
    return newState;
};

const getOKState = (state, data):RatingPageReducerState  => {
    let newState = {...state};
    newState.status = ReducerStateStatus.DONE;
    newState.record = data;
    newState.lastUpdated = Date.now();
    return newState;
};

export const RatingPageReducer = (state = initialState, action) : RatingPageReducerState => {
    switch (action.type) {
        case RatingActionTypes.GetTeammateRecordRequest:
            return getLoadingState(state);
        case RatingActionTypes.AddRatingRequest:
            return getLoadingState(state);
        case RatingActionTypes.UpdateRatingRequest:
            return getLoadingState(state);
        case RatingActionTypes.GetTeammateRecordOK:
            return getOKState(state, action.data);
        case RatingActionTypes.AddRatingOK:
            return getOKState(state, action.data);
        case RatingActionTypes.UpdateRatingOK:
            return getOKState(state, action.data);


        default:
            return state;
    }
};