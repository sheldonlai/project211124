import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Route, Router} from "react-router";
import {Link} from "react-router-dom";
import {Home} from "./home/home";
import FlatButton from 'material-ui/FlatButton';
import {LoginView, LoginPage} from './auth/LoginView';
import {Routes} from '../constants/Routes';
import {RegistrationPage, RegistrationView} from './auth/RegistrationView';
import {CreateQuestion} from './question/CreateQuestion';
import {AuthActions} from '../actions/AuthActions';
import {RouterController} from '../api.controllers/RouterController';
import {connect, Provider} from "react-redux";
import {Menu} from "./Menu";

let muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#d3ffbb',
        primary2Color: '#d3ffbb',
        primary3Color: '#d3ffbb',
    },
    appBar: {
        height: 50,
    }

});
// a hack because @types/material-ui hasn't included this
(muiTheme.flatButton as any).textTransform = 'none';

export class App extends React.Component<any, any> {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Provider store={this.props.store}>
                    <Router history={RouterController.history}>
                        <div>
                            <Route path={Routes.home} component={Menu} />
                            <Route exact path={Routes.home} component={Home}/>
                            <Route exact path={Routes.login} component={LoginPage}/>
                            <Route exact path={Routes.registration} component={RegistrationPage}/>
                            <Route exact path={Routes.createQuestion} component={CreateQuestion}/>
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        )
    }
}
