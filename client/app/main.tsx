import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppContainer from "./containers/AppContainer";
import injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin()
ReactDOM.render(<AppContainer />, document.getElementById('app'));