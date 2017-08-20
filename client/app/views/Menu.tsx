import * as React from "react";
import {Component, CSSProperties} from "react";
import Button from 'material-ui/Button';
import {Routes} from "../constants/Routes";
import {AuthActions} from "../actions/AuthActions";
import {connect} from "react-redux";
import {AppStoreState} from "../stores/AppStore";
import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {RouteComponentProps, RouterProps} from "react-router";
import {CustomLink} from "../components/CustomLink";
import AppBar from 'material-ui/AppBar';
import {UserDto} from "../../../server/dtos/auth/UserDto";
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';

const menuButtonStyle : CSSProperties= {
    height: "50px",
    textTransform: "none"
};


export interface MenuClassProps extends RouteComponentProps<{}> {
    logout: () => void;
    loggedIn: boolean;
    authStatus: ReducerStateStatus;
    user: UserDto;
}

class MenuClass extends Component<MenuClassProps> {

    button = (text: string, to: string) => (
        <CustomLink to={to}>
            <Button color="contrast" style={menuButtonStyle}>
                {text}
            </Button>
        </CustomLink>
    );

    navigateTo = (url: string) => {
        this.props.history.push(url);
    };

    buttons = () => {
        if (!this.props.loggedIn) {
            return this.button("Login", Routes.login)
        } else {
            // const topLeftButtons = [
            //     new ButtonData(this.props.user.username, undefined, "contrast"),
            //     new ButtonData("Profile", ()=>this.navigateTo(Routes.my_profile)),
            //     new ButtonData("Log out", ()=>this.props.logout()),
            // ];
            return (
                <div>
                    {this.button("Profile", Routes.my_profile)}
                    <Button color="contrast" style={menuButtonStyle} onClick={this.props.logout}>
                        Logout
                    </Button>
                </div>
            )
        }
    };

    getColor = () => {
        let pathName = this.props.location.pathname;
        if (pathName === Routes.home){
            return "#FF6526";
        } else if (pathName.indexOf(Routes.question) !== -1){
            return "#32d29d";
        } else if (pathName.indexOf(Routes.story) !== -1){
            return "#3066f8";
        } else {
            return "#37474F";
        }

    }

    render() {
        let color = this.getColor();
        return (
            <AppBar position="static" className="menu" style={{backgroundColor: color}}>
                <Toolbar>
                    <div style={{flex: 1}}>
                        <CustomLink to={Routes.home}>
                            <Button color="contrast" style={menuButtonStyle}>
                                <Typography type="title" color="inherit">
                                    Askalot
                                </Typography>
                            </Button>
                        </CustomLink>
                        {this.button("Questions", Routes.question)}
                        {this.button("Stories", Routes.story)}
                        {this.button("RateMyTeammate", Routes.rate_my_teammate)}
                    </div>
                    <div style={{float: "left"}}>
                        {this.buttons()}
                    </div>

                </Toolbar>
            </AppBar>
        )
    }
}

export const Menu = connect<any, any, any>(
    (state: AppStoreState) => ({
        loggedIn: state.auth.loggedIn,
        user: state.auth.user,
        authStatus: state.auth.status,
    }),
    (dispatch) => ({logout: () => dispatch(AuthActions.logout())})
)(MenuClass);