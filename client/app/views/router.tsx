import * as React from "react";
import {MuiThemeProvider} from "material-ui/styles";
import createPalette from "material-ui/styles/palette";
import {Route, Router} from "react-router";
import {Home} from "./home/home";
import {LoginPage} from "./auth/LoginView";
import {Routes} from "../constants/Routes";
import {RegistrationPage} from "./auth/RegistrationView";
import {CreateQuestionPage} from "./question/CreateQuestion";
import {RouterController} from "../api.controllers/RouterController";
import {Provider} from "react-redux";
import {Menu} from "./Menu";
import {QuestionHomePage} from "./question/QuestionHome";
import {QuestionPageView} from "./question/QuestionPage";
import TransitionGroup =require('react-transition-group/TransitionGroup');
import {ErrorSnackBar} from "./ErrorView";
import {ServiceHomeView} from "./services/ServiceHome";
import {UserProfileView} from "./profile/UserProfileView";
// import {lightBlue, green} from "material-ui/styles/colors";
// let muiTheme = createMuiTheme({
//     palette: createPalette({
//         primary: lightBlue,
//         accent: {
//             ...green,
//             A400: '#00e677',
//         },
//     })
// });

const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};

export class App extends React.Component<any, any> {
    render() {
        return (
            <MuiThemeProvider>
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
                            <Route exact path={Routes.question}
                                   render={({match, ...rest}) => (
                                       <TransitionGroup component={firstChild}>
                                           <QuestionHomePage match={match} {...rest} />
                                       </TransitionGroup>
                                   )}
                            />
                            <Route exact path={Routes.createQuestion}
                                   render={({match, ...rest}) => (
                                       <TransitionGroup component={firstChild}>
                                           <CreateQuestionPage match={match} {...rest} />
                                       </TransitionGroup>
                                   )}
                            />
                            <Route path={Routes.question_by_id}
                                   render={({match, ...rest}) => (
                                       <TransitionGroup component={firstChild}>
                                           <QuestionPageView match={match} {...rest} />
                                       </TransitionGroup>
                                   )}
                            />
                            <Route path={Routes.services}
                                   render={({match, ...rest}) => (
                                       <TransitionGroup component={firstChild}>
                                           <ServiceHomeView match={match} {...rest} />
                                       </TransitionGroup>
                                   )}
                            />
                            <Route path={Routes.my_profile}
                                   render={({match, ...rest}) => (
                                       <TransitionGroup component={firstChild}>
                                           <UserProfileView match={match} {...rest} />
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
