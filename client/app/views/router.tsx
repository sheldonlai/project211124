import * as React from "react";
import {createMuiTheme, MuiThemeProvider} from "material-ui/styles";
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

let muiTheme = createMuiTheme({
    palette: createPalette({
        primary1Color: '#3f7ef8',
        primary2Color: '#56ffdb',
        primary3Color: '#d3ffbb',
    })
});
// a hack because @types/material-ui hasn't included this
//(muiTheme.flatButton as any).textTransform = 'none';

const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};

export class App extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Provider store={this.props.store}>
                    <Router history={RouterController.history}>
                        <div>
                            <Route path={Routes.home} component={Menu}/>
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
                            <Route path={Routes.question_by_title}
                                   render={({match, ...rest}) => (
                                       <TransitionGroup component={firstChild}>
                                           <QuestionPageView match={match} {...rest} />
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
