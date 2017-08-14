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
import {Menu} from "./Menu";
import {ErrorSnackBar} from "./ErrorView";
import {UserProfileView} from "./profile/UserProfileView";
import {RatingHomeView} from "./rating/RatingHomeView";
import {blueGrey, deepOrange} from "material-ui/colors";
import {CreateTeammateView} from "./rating/CreateTeammateView";
import {RatingPageView} from "./rating/RatingPageView";
import TransitionGroup =require('react-transition-group/TransitionGroup');
import {Bundle} from "../components/Bundle";
import {LoadingScreen} from "../components/Animations/LoadingScreen";
let questionLoader = require("bundle-loader?lazy&name=question!./QuestionRouter");
let storyLoader = require("bundle-loader?lazy&name=story!./StoryRouter");
let muiTheme = createMuiTheme({
    palette: createPalette({
        primary: deepOrange,
        accent: blueGrey
    })
});

const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};

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
                            <Route path={Routes.home} component={Menu}/>
                            <Route path={Routes.home} component={ErrorSnackBar}/>
                            <Route exact path={Routes.home}
                                   render={({match, ...rest}) => (
                                       <TransitionGroup component={firstChild}>
                                           <Home match={match} {...rest} />
                                       </TransitionGroup>
                                   )}/>
                            <Route exact path={Routes.login}
                                   render={({match, ...rest}) => (
                                       <TransitionGroup component={firstChild}>
                                           <LoginPage match={match} {...rest} />
                                       </TransitionGroup>
                                   )}
                            />
                            <Route exact path={Routes.registration}
                                   render={({match, ...rest}) => (
                                       <TransitionGroup component={firstChild}>
                                           <RegistrationPage match={match} {...rest} />
                                       </TransitionGroup>
                                   )}
                            />
                            <Route path={Routes.question}
                                   component={QuestionModule}
                            />
                            <Route path={Routes.story}
                                   component={StoryModule}
                            />
                            <Route path={Routes.my_profile}
                                   render={({match, ...rest}) => (
                                       <TransitionGroup component={firstChild}>
                                           <UserProfileView match={match} {...rest} />
                                       </TransitionGroup>
                                   )}
                            />
                            <Route path={Routes.rate_my_teammate}
                                   render={({match, ...rest}) => (
                                       <TransitionGroup component={firstChild}>
                                           <RatingHomeView match={match} {...rest} />
                                       </TransitionGroup>
                                   )}
                            />
                            <Route path={Routes.create_teammate_record}
                                   render={({match, ...rest}) => (
                                       <TransitionGroup component={firstChild}>
                                           <CreateTeammateView match={match} {...rest} />
                                       </TransitionGroup>
                                   )}
                            />
                            <Route path={Routes.rating}
                                   render={({match, ...rest}) => (
                                       <TransitionGroup component={firstChild}>
                                           <RatingPageView match={match} {...rest} />
                                       </TransitionGroup>
                                   )}
                            />
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        )
    }
}
