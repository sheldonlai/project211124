import AppDispatcher from '../dispatcher/AppDispatcher';
import {AuthActionTypes} from './AuthActionTypes';


class AuthActions {
    static login(username:string, password: string){
        AppDispatcher.dispatch({
            type: AuthActionTypes.LOGIN,
        });
    }

    static logout(){
        AppDispatcher.dispatch({
            type: AuthActionTypes.LOGOUT,
        });
    }
}

export default AuthActions;