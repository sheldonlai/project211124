import {AuthActionTypes} from "../constants/AuthActionTypes";
import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {CommonController} from "../api.controllers/CommonController";
import {QuestionPreview} from "../../../server/dtos/q&a/QuestionPreview";

export interface RegistrationReducerState {
    status : ReducerStateStatus;
}

const getLoginStatus = (): boolean => {
    return (CommonController.getInstance().getToken())? true : false;
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