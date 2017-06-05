import AppDispatcher from '../dispatcher/AppDispatcher';
import {AuthActionTypes} from './AuthActionTypes';
import {CommonController} from '../api.controllers/CommonController';
import {Routes} from '../constants/Routes';
import {LoginRequest} from '../models/LoginRequest';
import {RegistrationRequest} from '../models/RegistrationRequest';

let apiController : CommonController = CommonController.getInstance();
export class AuthActions {
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

    static register(regRequest: RegistrationRequest){
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
