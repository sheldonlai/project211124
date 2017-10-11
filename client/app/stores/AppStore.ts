import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {createLogger} from "redux-logger";
import {AuthReducer, AuthReducerState} from "../reducers/AuthReducer";
import thunkMiddleware from "redux-thunk";
import {QuestionHomeReducer, QuestionHomeReducerState} from "../reducers/QuestionHomeReducer";
import {ErrorReducer, ErrorReducerState} from "../reducers/ErrorReducer";
import {QuestionPageReducer, QuestionPageReducerState} from "../reducers/QuestionPageReducer";
import {QuestionEditorReducer, QuestionEditorReducerState} from "../reducers/QuestionEditorReducer";
import {LocationDataReducer, LocationDataReducerState} from "../reducers/LocationDataReducer";
import {RatingHomeReducer, RatingHomeReducerState} from "../reducers/TammateRatingHomeReducer";
import {RatingPageReducer, RatingPageReducerState} from "../reducers/RatingPageReducer";
import {StoryHomeReducer, StoryHomeReducerState} from "../reducers/StoryHomeReducer";
import {StoryPageReducer, StoryPageReducerState} from "../reducers/StoryPageReducer";
import {DashboardReducer, DashboardReducerState} from "../reducers/DashboardReducer";
import {ProfileReducer, ProfileReducerState} from "../reducers/ProfileReducer";
import {RecruitmentPageReducer, RecruitmentPageReducerState} from "../reducers/RecruitmentPageReducer";
import {RecruitmentHomeReducer, RecruitmentHomeReducerState} from "../reducers/RecruitmentHomeReducer";

const loggerMiddleware = createLogger();
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

// The state we receive from match state to props
export interface AppStoreState {
    auth: AuthReducerState;
    dashboard: DashboardReducerState,
    questionHome: QuestionHomeReducerState;
    errors: ErrorReducerState;
    questionPage: QuestionPageReducerState;
    questionEditorState: QuestionEditorReducerState;
    locationData: LocationDataReducerState;
    ratingHome: RatingHomeReducerState;
    ratingPage: RatingPageReducerState;
    storyHome: StoryHomeReducerState;
    storyPage: StoryPageReducerState;
    recruitmentHome: RecruitmentHomeReducerState;
    recruitmentPage: RecruitmentPageReducerState;
    profile: ProfileReducerState,
}

const reducer = combineReducers({

    auth: AuthReducer,
    dashboard: DashboardReducer,
    questionHome: QuestionHomeReducer,
    errors: ErrorReducer,
    questionPage: QuestionPageReducer,
    questionEditorState: QuestionEditorReducer,
    locationData: LocationDataReducer,
    ratingHome: RatingHomeReducer,
    ratingPage: RatingPageReducer,
    storyHome: StoryHomeReducer,
    storyPage: StoryPageReducer,
    recruitmentHome: RecruitmentHomeReducer,
    recruitmentPage: RecruitmentPageReducer,
    profile: ProfileReducer,
});

export const store = createStore(
    reducer,
    composeEnhancers(
        process.env.NODE_ENV === 'production' ? f => f : applyMiddleware(loggerMiddleware),
        applyMiddleware(thunkMiddleware)
    ));
