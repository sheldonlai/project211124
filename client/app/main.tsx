import * as React from 'react';
import {render} from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import injectTapEventPlugin = require('react-tap-event-plugin');
import thunk from 'redux-thunk';
import {App} from "./views/router";
import {store} from "./stores/AppStore";

injectTapEventPlugin()
render(<App store={store}/>, document.getElementById('app'));