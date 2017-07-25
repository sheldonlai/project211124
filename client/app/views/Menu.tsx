import * as React from "react";
import {Component, CSSProperties} from "react";
import Button from 'material-ui/Button';
import {Link} from "react-router-dom";
import {Routes} from "../constants/Routes";
import {AuthActions} from "../actions/AuthActions";
import {connect} from "react-redux";
import {AppStoreState} from "../stores/AppStore";
import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {RouteProps, RouterProps} from "react-router";
import {CustomLink} from "../components/CustomLink";
import {ButtonData, ButtonMenu} from "../components/ButtonMenu";
import {UserDto} from "../../../server/dtos/auth/UserDto";

const menuButtonStyle : CSSProperties= {
    height: "50px",
    textTransform: "none"
};


export interface MenuClassProps extends RouterProps {
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

    render() {
        return (
            <div className="menu">
                <ul>
                    <li>
                        <Link to={Routes.home}>
                            <Button color="contrast" style={menuButtonStyle}>
                                ASKALOT
                            </Button>
                        </Link>
                        {this.button("Questions", Routes.question)}
                        {this.button("Services", Routes.services)}
                        {this.button("RateMyTeammate", Routes.rate_my_teammate)}
                    </li>
                </ul>
                <div id="login-menu">
                    {this.buttons()}
                </div>
            </div>
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