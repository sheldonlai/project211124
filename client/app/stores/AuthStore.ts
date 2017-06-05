import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {AuthActionTypes} from '../actions/AuthActionTypes';
import {CommonController} from '../api.controllers/CommonController';

export interface AuthState {
    loggedIn : boolean;
    role : string;
    permissions : any[];
}

class AuthenticationStoreClass extends ReduceStore<AuthState, any> {

    commonController : CommonController;

    constructor(){
        super(AppDispatcher);
        this.commonController = CommonController.getInstance();
    }

    getInitialState() : AuthState {
        let loggedIn = (CommonController.getInstance().getToken())? true : false;
        return {
            loggedIn: loggedIn,
            role: null,
            permissions : []
        };
    }

    isLoggedIn() :boolean {
        return (CommonController.getInstance().getToken())? true : false;
    }

    reduce(state: any, action: any) {
        switch (action.type) {
            case AuthActionTypes.LOGGED_IN:
                let data = action.data;
                return {
                    loggedIn: this.isLoggedIn(),
                    role: data.role,
                    permissions : [] // TODO : Add real permissions
                }

            case AuthActionTypes.LOGOUT:
                return this.getInitialState();

            default:
                return state;
        }
    }
}

export default new AuthenticationStoreClass();