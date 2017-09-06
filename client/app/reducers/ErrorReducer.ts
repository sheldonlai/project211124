
import {ErrorActionTypes} from "../constants/action.types/ErrorActionTypes";
export interface ErrorReducerState {
    errors : ErrorObject[];
}

export interface  ErrorObject {
    message: string;
    time: number;
}

const initialState : ErrorReducerState = {
    errors : []
};



export const ErrorReducer = (state = initialState, action) : ErrorReducerState => {
    switch (action.type) {
        case ErrorActionTypes.ADD_ERROR:
            state.errors.push({message: action.data, time: Date.now()});
            return {
                errors : state.errors
            };
        case ErrorActionTypes.CLEAR_ERROR:
            return {
                errors : [],
            };
        default:
            // clear errors
            return state;
    }
};