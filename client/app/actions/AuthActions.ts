
import {AuthActionTypes} from '../constants/action.types/AuthActionTypes';
import {CommonController} from '../api.controllers/CommonController';
import {Routes} from '../constants/Routes';
import {RouterController} from "../api.controllers/RouterController";
import {BaseActions} from "./BaseActions";
import {FrontEndAuthModels} from "../models/AuthModels";
import LoginRequest = FrontEndAuthModels.LoginRequest;
import RegistrationRequest = FrontEndAuthModels.RegistrationRequest;

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