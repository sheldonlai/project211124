import * as React from "react";
import {createMuiTheme, MuiThemeProvider} from "material-ui/styles";
import createPalette from "material-ui/styles/palette";
import {Route, Router} from "react-router";
import {Home} from "./home/home";
import {LoginPage} from "./auth/LoginView";
import {Routes} from "../constants/Routes";
import {RegistrationPage} from "./auth/RegistrationView";
import {RouterController} from "../api.controllers/RouterController";
import {Provider} from "react-redux";
import {MenuView} from "./Menu";
import {ErrorSnackBar} from "./ErrorView";
import {UserProfileView} from "./profile/UserProfileView";
import {RatingHomeView} from "./rating/RatingHomeView";
import {blueGrey, deepOrange} from "material-ui/colors";
import {CreateTeammateView} from "./rating/CreateTeammateView";
import {RatingPageView} from "./rating/RatingPageView";
import {Bundle} from "../components/Bundle";
import {LoadingScreen} from "../components/Animations/LoadingScreen";
let questionLoader = require("bundle-loader?lazy&name=question!./question/QuestionRouter");
let storyLoader = require("bundle-loader?lazy&name=story!./story/StoryRouter");
let muiTheme = createMuiTheme({
    palette: createPalette({
        primary: deepOrange,
        accent: blueGrey
    })
});
const QuestionModule = () => (
    <Bundle load={questionLoader}>
        {(mod) => (
            mod ? mod() : <LoadingScreen/>
        )}
    </Bundle>
);

const StoryModule = () => (
    <Bundle load={storyLoader}>
        {(mod) => (
            mod ? mod() : <LoadingScreen/>
        )}
    </Bundle>
);

export class App extends React.Component<any, any> {
    render() {
        return (
            <MuiThemeProvider theme={muiTheme}>
                <Provider store={this.props.store}>
                    <Router history={RouterController.history}>
                        <div>
                            <Route path={Routes.home} component={MenuView}/>
                            <Route path={Routes.home} component={ErrorSnackBar}/>
                            <Route exact path={Routes.home} component={Home}/>
                            <Route exact path={Routes.login} component={LoginPage}/>
                            <Route exact path={Routes.registration} component={RegistrationPage}/>
                            <Route path={Routes.question} component={QuestionModule}/>
                            <Route path={Routes.story} component={StoryModule}/>
                            <Route exact path={Routes.my_profile} component={UserProfileView}/>
                            <Route exact path={Routes.rate_my_teammate} component={RatingHomeView}/>
                            <Route exact path={Routes.create_teammate_record} component={CreateTeammateView}/>
                            <Route exact path={Routes.rating} component={RatingPageView}/>
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        )
    }
}
