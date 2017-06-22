
import {ErrorActionTypes} from "../actions/ErrorActionTypes";
export interface ErrorReducerState {
    error : string;
    errorTime : number;
}

const initialState : ErrorReducerState = {
    error : '',
    errorTime : Date.now()
};



export const ErrorReducer = (state = initialState, action) : ErrorReducerState => {
    switch (action.type) {
        case ErrorActionTypes.ERROR:
            return {
                error : action.data,
                errorTime : Date.now()
            };
        case ErrorActionTypes.CLEAR_ERROR:
            return {
                error : '',
                errorTime : Date.now()
            };
        default:
            // clear error
            return state;
    }
};