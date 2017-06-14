import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {createLogger} from "redux-logger";
import {AuthReducer, AuthReducerState} from "../reducers/AuthReducer";
import thunkMiddleware from "redux-thunk";

const loggerMiddleware = createLogger();
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

// The state we receive from match state to props
export interface AppStoreState{
    AuthReducer : AuthReducerState;
}

const reducer = combineReducers({
    AuthReducer
});

export const store = createStore(
    reducer,
    composeEnhancers(
        process.env.NODE_ENV === 'production' ? f => f : applyMiddleware(loggerMiddleware),
        applyMiddleware(thunkMiddleware)
));
