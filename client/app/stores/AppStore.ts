import {
    createStore,
    applyMiddleware,
    combineReducers,
    compose,
} from 'redux';
import { createLogger } from 'redux-logger';
import {AuthReducer} from "../reducers/AuthReducer";

const loggerMiddleware = createLogger();
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
import thunkMiddleware from 'redux-thunk'
const reducer = combineReducers({
    AuthReducer
});

export const store = createStore(
    reducer,
    composeEnhancers(
        process.env.NODE_ENV === 'production' ? f => f : applyMiddleware(loggerMiddleware),
        applyMiddleware(thunkMiddleware)
));
