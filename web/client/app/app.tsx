import * as React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import {Route, Router} from "react-router";
import {Link} from "react-router-dom";
import {Home} from "./home/home";
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()


export class App extends React.Component<any, any> {
    constructor(props: any) {
        injectTapEventPlugin();
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
                <Router history={history}>
                    <div>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                        </ul>

                        <hr/>

                        <Route exact path="/" component={Home}/>
                    </div>
                </Router>
            </MuiThemeProvider>
        )
    }
}