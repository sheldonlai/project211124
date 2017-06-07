import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Route, Router} from "react-router";
import {Link} from "react-router-dom";
import {Home} from "./home/home";
import FlatButton from 'material-ui/FlatButton';
import {LoginView} from './auth/LoginView';
import {Routes} from '../constants/Routes';
import {RegistrationView} from './auth/RegistrationView';
import {CreateQuestion} from './question/CreateQuestion';
import {AuthStoreState} from '../stores/AuthStore';
import {AuthActions} from '../actions/AuthActions';
import {RouterController} from '../api.controllers/RouterController';
import {QuestionViewContainer} from '../containers/QuestionContainer';

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

const menuButtonStyle = {
    "height" : "50px"
};

const flatButtonStyle = {
    "fontSize": "14px"
};

export interface AppProps extends AuthStoreState{

}


export class App extends React.Component<AppProps, any> {
    constructor(props) {
        super(props);

    }

    HomePage =() => {return <Home/>};

    LoginPage = () => {return <LoginView/>};

    RegistrationPage = () => {return <RegistrationView/>};

    CreateQuestionPage = () => {return <CreateQuestion/>};

    buttons = () => {
        if (this.props.loggedIn) {
            return (
                <Link to={Routes.login}>
                    <FlatButton label="Login" primary={true} style={menuButtonStyle}
                                labelStyle={flatButtonStyle}/>
                </Link>
            )
        } else {
            return (
                <div>
                    <FlatButton label="Log Out" primary={true} style={menuButtonStyle}
                                labelStyle={flatButtonStyle} onTouchTap={() => {AuthActions.logout()}}/>
                </div>
            )
        }
    };

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router history={RouterController.history}>
                    <div>
                        <div className="menu">
                            <ul>
                                <li>
                                    <Link to={Routes.home}>
                                        <FlatButton label="Askalot" primary={true} style={menuButtonStyle}
                                                    labelStyle={{"fontSize" : "20px"}}/>
                                    </Link>
                                    <Link to={Routes.question}>
                                        <FlatButton label="Questions" primary={true} style={menuButtonStyle}
                                                    labelStyle={flatButtonStyle}/>
                                    </Link>
                                </li>
                            </ul>
                            <div id="login-menu">
                                {this.buttons()}
                            </div>
                        </div>
                        <Route exact path={Routes.home} component={this.HomePage}/>
                        <Route exact path={Routes.login} component={this.LoginPage}/>
                        <Route exact path={Routes.registration} component={this.RegistrationPage}/>
                        <Route exact path={Routes.createQuestion} component={CreateQuestion}/>
                        <Route exact path={Routes.question} component={QuestionViewContainer}/>
                    </div>
                </Router>
            </MuiThemeProvider>
        )
    }
}