import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {createLogger} from "redux-logger";
import {AuthReducer, AuthReducerState} from "../reducers/AuthReducer";
import thunkMiddleware from "redux-thunk";
import {QuestionHomeReducer, QuestionHomeReducerState} from "../reducers/QuestionHomeReducer";
import {ErrorReducer, ErrorReducerState} from "../reducers/ErrorReducer";
import {QuestionPageReducer, QuestionPageReducerState} from "../reducers/QuestionPageReducer";

const loggerMiddleware = createLogger();
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

// The state we receive from match state to props
export interface AppStoreState {
    auth : AuthReducerState;
    question: QuestionHomeReducerState;
    errors: ErrorReducerState;
    questionPage: QuestionPageReducerState;
}
const reducer = combineReducers({
    auth: AuthReducer,
    question: QuestionHomeReducer,
    errors: ErrorReducer,
    questionPage: QuestionPageReducer,
});

export const store = createStore(
    reducer,
    composeEnhancers(
        process.env.NODE_ENV === 'production' ? f => f : applyMiddleware(loggerMiddleware),
        applyMiddleware(thunkMiddleware)
));
