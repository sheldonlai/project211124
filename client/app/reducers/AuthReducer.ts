import {AuthActions} from "../actions/AuthActions";
import {AuthActionTypes} from "../actions/AuthActionTypes";
import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {CommonController} from "../api.controllers/CommonController";
/**
 * Created by SHELDON on 6/11/2017.
 */

export interface AuthReducerState {
    status : ReducerStateStatus;
    user : any;
    loggedIn : boolean;
}

const initialState : AuthReducerState = {
    status : ReducerStateStatus.LOADING,
    user: null,
    loggedIn: (CommonController.getInstance().getToken())? true : false,
};
console.log()

export const AuthReducer = (state = initialState, action) : AuthReducerState => {
    switch (action.type) {
        case AuthActionTypes.LOGIN_REQUEST:
            return {
                status : ReducerStateStatus.LOADING,
                user : null,
                loggedIn : false,
            };
        case AuthActionTypes.LOGIN_OK:
            return {
                status : ReducerStateStatus.DONE,
                user : null,
                loggedIn : true,
            };
        case AuthActionTypes.LOGIN_ERR:
            return {
                status : ReducerStateStatus.ERROR,
                user : null,
                loggedIn : false,
            };
        default:
            return state;
    }
};