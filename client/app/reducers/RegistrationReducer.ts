import {AuthActionTypes} from "../constants/action.types/AuthActionTypes";
import {ReducerStateStatus} from "../constants/ReducerStateStatus";

export interface RegistrationReducerState {
    status : ReducerStateStatus;
}

const initialState : RegistrationReducerState = {
    status : ReducerStateStatus.LOADING
};

export const RegistrationReducer = (state = initialState, action) : RegistrationReducerState => {
    switch (action.type) {
        case AuthActionTypes.REGISTER_REQUEST:
            return {
                status : ReducerStateStatus.LOADING,

            };
        case AuthActionTypes.REGISTER_OK:
            return {
                status : ReducerStateStatus.DONE,

            };
        case AuthActionTypes.REGISTER_ERR:
            return {
                status : ReducerStateStatus.ERROR
            };
        default:
            return state;
    }
};