import {AuthActions} from "../actions/AuthActions";
import {AuthActionTypes} from "../actions/AuthActionTypes";
import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {CommonController} from "../api.controllers/CommonController";

export interface AuthReducerState {
    status : ReducerStateStatus;
    user : any;
    loggedIn : boolean;
}

const getLoginStatus = (): boolean => {
    return (CommonController.getInstance().getToken())? true : false;
}

const initialState : AuthReducerState = {
    status : ReducerStateStatus.LOADING,
    user: null,
    loggedIn: getLoginStatus(),
};

export const AuthReducer = (state = initialState, action) : AuthReducerState => {
    switch (action.type) {
        case AuthActionTypes.LOGIN_REQUEST:
            return {
                status : ReducerStateStatus.LOADING,
                user : null,
                loggedIn : getLoginStatus(),
            };
        case AuthActionTypes.LOGIN_OK:
            return {
                status : ReducerStateStatus.DONE,
                user : null,
                loggedIn : getLoginStatus(),
            };
        case AuthActionTypes.LOGIN_ERR:
            return {
                status : ReducerStateStatus.ERROR,
                user : null,
                loggedIn : getLoginStatus(),
            };
        default:
            return state;
    }
};