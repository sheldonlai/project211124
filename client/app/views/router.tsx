import * as React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
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
import {QuestionPage} from "./question/QuestionPage";

let muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#d3ffbb',
        primary2Color: '#d3ffbb',
        primary3Color: '#d3ffbb',
    },
    appBar: {
        height: 50,
    }

});
// a hack because @types/material-ui hasn't included this
(muiTheme.flatButton as any).textTransform = 'none';

export class App extends React.Component<any, any> {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Provider store={this.props.store}>
                    <Router history={RouterController.history}>
                        <div>
                            <Route path={Routes.home} component={Menu} />
                            <Route exact path={Routes.home} component={Home}/>
                            <Route exact path={Routes.login} component={LoginPage}/>
                            <Route exact path={Routes.registration} component={RegistrationPage}/>
                            <Route exact path={Routes.question} component={QuestionHomePage}/>
                            <Route exact path={Routes.createQuestion} component={CreateQuestionPage}/>
                            <Route path={Routes.question_by_title} component={QuestionPage} />
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        )
    }
}
