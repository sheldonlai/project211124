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
                ...state,
                error: false,
                loading: true,
                rankings: null,
                hero_id: null,
            };
        case AuthActionTypes.LOGIN_OK:
            return {
                ...state,
                error: false,
                loading: false,
                hero_id: action.payload.hero_id,
                rankings: action.payload.rankings,
            };
        case AuthActionTypes.LOGIN_ERR:
            return {
                ...state,
                error: true,
                loading: false,
                rankings: null,
                hero_id: null,
            };
        default:
            return state;
    }
};