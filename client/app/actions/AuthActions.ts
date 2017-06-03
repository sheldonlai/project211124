import AppDispatcher from '../dispatcher/AppDispatcher';
import {AuthActionTypes} from './AuthActionTypes';
import {CommonController} from '../api.controllers/CommonController';
import {LoginRequest} from '../../../common/dtos/auth/LoginRequest';
import {Routes} from '../constants/Routes';

let apiController : CommonController = CommonController.getInstance();
class AuthActions {
    static login(login: LoginRequest){
        apiController.login(login).then(res => {
            apiController.setToken(res.data.token);
            apiController.routerHistory.push(Routes.home)
            AppDispatcher.dispatch({
                type: AuthActionTypes.LOGGED_IN,
                data: res.data
            });
        })
    }

    static logout(){
        AppDispatcher.dispatch({
            type: AuthActionTypes.LOGOUT,
        });
    }

    static register(regRequest: any){
        apiController.registerUser(regRequest).then(res => {
            apiController.setToken(res.data.token);
            apiController.routerHistory.push(Routes.home);
            AppDispatcher.dispatch({
                type: AuthActionTypes.LOGOUT,
                data: res.data
            });
        })
    }
}

export default AuthActions;