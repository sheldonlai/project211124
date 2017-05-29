import AuthStore from '../stores/AuthStore'
import {App} from '../views/app';
import AuthActions from '../actions/AuthActions';
import {Component} from 'react';
import {Container} from 'flux/utils';
import * as React from 'react';

class AppContainerClass extends Component<any, any>{
    static getStores() {
        return [AuthStore];
    }

    static calculateState(prevState) {
        return {
            authStatus: AuthStore.getState(),
        };
    }

    render() {
        return <App {...this.state} />;
    }
}


const AppContainer = Container.create(AppContainerClass)
export default AppContainer;