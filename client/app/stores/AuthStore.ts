import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {AuthActionTypes} from '../actions/AuthActionTypes';

class AuthenticationStoreClass extends ReduceStore<any, any> {

    constructor(){
        super(AppDispatcher);
    }
    getInitialState() {
        return {};
    }

    reduce(state: any, action: any) {
        switch (action.type) {
            case AuthActionTypes.LOGIN:

            case AuthActionTypes.LOGOUT:

            default:
                return state;
        }
    }
}

export default new AuthenticationStoreClass();