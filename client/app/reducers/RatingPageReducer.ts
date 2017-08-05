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

export const RatingPageReducer = (state = initialState, action) : RatingPageReducerState => {
    switch (action.type) {
        case RatingActionTypes.GetTeammateRecordRequest:
            return getLoadingState(state);
        case RatingActionTypes.GetTeammateRecordOK:
            state = {...state};
            state.status = ReducerStateStatus.DONE;
            state.record = action.data;
            state.lastUpdated = Date.now();
            return state;
        default:
            return state;
    }
};