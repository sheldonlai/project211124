import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import {Route, Router} from "react-router";
import {Link} from "react-router-dom";
import {Home} from "./home/home";
import createBrowserHistory from 'history/createBrowserHistory'
import FlatButton from 'material-ui/FlatButton';
import {deepOrange800, deepOrangeA700, orange800} from 'material-ui/styles/colors';
const history = createBrowserHistory()

let muiTheme = getMuiTheme({
    palette: {
        primary1Color: orange800,
        primary2Color: deepOrangeA700,
        primary3Color: deepOrange800,
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
    constructor(props: any) {
        injectTapEventPlugin();
        super(props);
    }

    render() {
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
                        </div>
                        <Route exact path="/" component={Home}/>
                    </div>
                </Router>
            </MuiThemeProvider>
        )
    }
}