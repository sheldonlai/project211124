import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import {Route, Router} from "react-router";
import {Link} from "react-router-dom";
import {Home} from "./home/home";
import createBrowserHistory from 'history/createBrowserHistory'
import FlatButton from 'material-ui/FlatButton';
import {LoginView} from './auth/Login';
import {Routes} from '../constants/Routes';
import {RegistrationView} from './auth/RegistrationView';
const history = createBrowserHistory()

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
}


export class App extends React.Component<any, any> {
    constructor(props) {
        injectTapEventPlugin();
        super(props);
    }

    render() : any {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router history={history}>
                    <div>
                        <div className="menu">
                            <ul>
                                <li>
                                    <Link to="/">
                                        <FlatButton label="Askalot" primary={true} style={menuButtonStyle}
                                                    labelStyle={{"fontSize" : "20px"}}/>
                                    </Link>
                                </li>
                            </ul>
                            <div id="login-menu">
                                <Link to={Routes.login}>
                                    <FlatButton label="Login" primary={true} style={menuButtonStyle}
                                                labelStyle={{"fontSize" : "16px"}}/>
                                </Link>
                            </div>
                        </div>
                        <Route exact path={Routes.home} component={Home} {...this.props}/>
                        <Route exact path={Routes.login} component={LoginView} {...this.props}/>
                        <Route exact path={Routes.registration} component={RegistrationView} {...this.props}/>
                        {/*<Route exact path={Routes.registration} component={RegistrationView} {...this.props}/>*/}
                        {/*<Route exact path={Routes.registration} component={RegistrationView} {...this.props}/>*/}
                    </div>
                </Router>
            </MuiThemeProvider>
        )
    }
}