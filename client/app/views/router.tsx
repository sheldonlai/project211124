import * as React from "react";
import {createMuiTheme, MuiThemeProvider} from "material-ui/styles";
import {Route, Router} from "react-router";
import {Home} from "./home/home";
import {LoginPage} from "./auth/LoginView";
import {Routes} from "../constants/Routes";
import {RouterController} from "../api.controllers/RouterController";
import {connect, Provider} from "react-redux";
import {MenuView} from "./menu/Menu";
import {ErrorSnackBar} from "./ErrorView";
import {UserProfileView} from "./profile/UserProfileView";
import {RatingHomeView} from "./rating/RatingHomeView";
import {blueGrey, deepOrange} from "material-ui/colors";
import {CreateTeammateView} from "./rating/CreateTeammateView";
import {RatingPageView} from "./rating/RatingPageView";
import {Bundle} from "../components/Bundle";
import {LoadingScreen} from "../components/Animations/LoadingScreen";
import {RegistrationView} from "./auth/RegistrationView";
import {AppStoreState} from "../stores/AppStore";
import {UserTypeEnum} from "../../../server/enums/UserTypeEnum";
import {ProfileView} from "./profile/ProfileView";
import {RecruitmentHomeView} from "./recruitment/RecruitmentHome";
import {CreateRecruitmentView} from "./recruitment/CreateRecruitmentView"

let questionLoader = require("bundle-loader?lazy&name=question!./question/QuestionRouter");
let storyLoader = require("bundle-loader?lazy&name=story!./story/StoryRouter");
let adminLoader = require("bundle-loader?lazy&name=admin!./admin/AdminRouter");
export const PRIMARY_COLOR = deepOrange[500];
let muiTheme = createMuiTheme({
    palette: {
        primary: deepOrange,
        accent: {
            ...blueGrey,
            A200: blueGrey[500]
        },
    }
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


const AdminModule = connect(
    (state: AppStoreState) => ({user : state.auth.user})
)((props) => {
    if (!props.user || props.user.role !== UserTypeEnum.ADMIN){
        return <div>
            404 Not Found
        </div>
    }
    return <Bundle load={adminLoader}>
        {(mod) => (
            mod ? mod() : <LoadingScreen/>
        )}
    </Bundle>
});

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
                            <Route exact path={Routes.registration} component={RegistrationView}/>
                            <Route path={Routes.question} component={QuestionModule}/>
                            <Route path={Routes.story} component={StoryModule}/>
                            <Route exact path={Routes.my_profile} component={UserProfileView}/>
                            <Route exact path={Routes.profile} component={ProfileView}/>
                            <Route exact path={Routes.people} component={RatingHomeView}/>
                            <Route exact path={Routes.create_teammate_record} component={CreateTeammateView}/>
                            <Route exact path={Routes.rating} component={RatingPageView}/>
                            <Route exact path={Routes.recruitment} component={RecruitmentHomeView}/>
                            <Route path={Routes.admin} component={AdminModule} />
                            <Route exact path={Routes.create_recruitment} component={CreateRecruitmentView}/>
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        )
    }
}
