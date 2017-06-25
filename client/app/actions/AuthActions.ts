
import {AuthActionTypes} from '../constants/AuthActionTypes';
import {CommonController} from '../api.controllers/CommonController';
import {Routes} from '../constants/Routes';
import {LoginRequest} from '../models/LoginRequest';
import {RegistrationRequest} from '../models/RegistrationRequest';
import {RouterController} from "../api.controllers/RouterController";
import {BaseActions} from "./BaseActions";

let apiController : CommonController = CommonController.getInstance();

export class AuthActions extends BaseActions {
    static login(login: LoginRequest){
        return function (dispatch) {
            dispatch({
                type: AuthActionTypes.LOGIN_REQUEST
            });
            apiController.login(login)
                .then(function (response) {
                    apiController.setToken(response.data.token);
                    RouterController.history.push(Routes.home);
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
            apiController.logout();
            dispatch({
               type: AuthActionTypes.LOGOUT
            });
        }
    }

    static register(regRequest: RegistrationRequest) {
        return function(dispatch) {
            dispatch({type: AuthActionTypes.REGISTER_REQUEST});
            apiController.registerUser(regRequest).then(res => {
                apiController.setToken(res.data.token);
                RouterController.history.push(Routes.home);
                dispatch({
                    type: AuthActionTypes.REGISTER_OK,
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