import AppDispatcher from '../dispatcher/AppDispatcher';
import {AuthActionTypes} from './AuthActionTypes';
/**
 * Created by SHELDON on 5/27/2017.
 */

const AuthActions = {
    login(username:string, password: string){
        AppDispatcher.dispatch({
            type: AuthActionTypes.LOGIN,
        });
    },

    logout(){
        AppDispatcher.dispatch({
            type: AuthActionTypes.LOGOUT,
        });
    }
}

export default AuthActions;