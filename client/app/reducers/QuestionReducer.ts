import {AuthActionTypes} from "../constants/AuthActionTypes";
import {ReducerStateStatus} from "../constants/ReducerStateStatus";

export interface QuestionReducerState {
    status : ReducerStateStatus;
}

const initialState : QuestionReducerState = {
    status : ReducerStateStatus.LOADING
};

export const QuestionReducer = (state = initialState, action) : QuestionReducerState => {
    switch (action.type) {
        case AuthActionTypes.REGISTER_REQUEST:
            return {
                status : ReducerStateStatus.LOADING
            };
        case AuthActionTypes.REGISTER_OK:
            return {
                status : ReducerStateStatus.DONE
            };
        case AuthActionTypes.REGISTER_ERR:
            return {
                status : ReducerStateStatus.ERROR
            };
        default:
            return state;
    }
};