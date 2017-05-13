import * as React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import * as injectTapEventPlugin from 'react-tap-event-plugin';


export class App extends React.Component<any, any> {
    constructor(props: any) {
        injectTapEventPlugin();
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
                <Paper id="content-container" zDepth={5} rounded={true} style={{overflow: "hidden"}}>
                </Paper>
            </MuiThemeProvider>
        )
    }
}