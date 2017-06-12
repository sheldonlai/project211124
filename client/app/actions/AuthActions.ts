
import {AuthActionTypes} from './AuthActionTypes';
import {CommonController} from '../api.controllers/CommonController';
import {Routes} from '../constants/Routes';
import {LoginRequest} from '../models/LoginRequest';
import {RegistrationRequest} from '../models/RegistrationRequest';

let apiController : CommonController = CommonController.getInstance();

export class AuthActions {
    static login(login: LoginRequest) {
        return function (dispatch) {
            dispatch({
                type: AuthActionTypes.LOGIN_REQUEST
            });
            return apiController.login(login)
                .then(function (response) {
                    apiController.setToken(response.data.token);
                    apiController.routerHistory.push(Routes.home)
                    dispatch({
                        type: AuthActionTypes.LOGIN_OK,
                        data: response
                    });
                }).catch(err => {
                    dispatch({
                        type: AuthActionTypes.LOGIN_ERR,
                        data: err
                    });
                })
        }
    }

    static logout() {
        return function(dispatch) {
            return {
               type: AuthActionTypes.LOGOUT
            };
        }
    }

    static register(regRequest: RegistrationRequest) {
        return function(dispatch) {
            dispatch({type: AuthActionTypes.REGISTER_REQUEST});
            apiController.registerUser(regRequest).then(res => {
                apiController.setToken(res.data.token);
                apiController.routerHistory.push(Routes.home);
                dispatch({
                    type: AuthActionTypes.REGISTER_REQUEST,
                    data : res
                });
            }).catch(err=> {
                dispatch({
                    type: AuthActionTypes.REGISTER_REQUEST,
                    err : err
                });
            })
        }
    }
}