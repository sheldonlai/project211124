

import {ReducerStateStatus} from "../constants/ReducerStateStatus";

export interface NotificationReducerState {
    status : ReducerStateStatus;
    notifications: any[];

}

const initialState : NotificationReducerState = {
    status : ReducerStateStatus.NONE,
    notifications: []
};

const getLoadingState = (state: NotificationReducerState) => {
    state = {...state};
    state.status = ReducerStateStatus.LOADING;
    return state;
};

export const NotificationReducer = (state = initialState, action) : NotificationReducerState => {
    switch (action.type) {
        default:
            return state;
    }
};