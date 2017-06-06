import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {AuthActionTypes} from '../actions/AuthActionTypes';
import {CommonController} from '../api.controllers/CommonController';

export interface AuthStoreState {
    loggedIn : boolean;
    role : string;
    permissions : any[];
}

class AuthenticationStoreClass extends ReduceStore<AuthStoreState, any> {

    commonController : CommonController;

    constructor(){
        super(AppDispatcher);
        this.commonController = CommonController.getInstance();
    }

    getInitialState() : AuthStoreState {
        let loggedIn = !!(CommonController.getInstance().getToken())
        return {
            loggedIn: loggedIn,
            role: null,
            permissions : []
        };
    }

    isLoggedIn() :boolean {
        return !!(CommonController.getInstance().getToken())
    }

    reduce(state: any, action: any) {
        switch (action.type) {
            case AuthActionTypes.LOGGED_IN:
                let data = action.data;
                return {
                    loggedIn: this.isLoggedIn(),
                    role: data.role,
                    permissions : [] // TODO : Add real permissions
                };

            case AuthActionTypes.LOGOUT:
                return this.getInitialState();

            default:
                return state;
        }
    }
}


const AuthStore = new AuthenticationStoreClass();
export default AuthStore;