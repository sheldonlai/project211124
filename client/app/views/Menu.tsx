import * as React from "react";
import {Component} from "react";
import Button from 'material-ui/Button';
import {Link} from "react-router-dom";
import {Routes} from "../constants/Routes";
import {AuthActions} from "../actions/AuthActions";
import {connect} from "react-redux";
import {AppStoreState} from "../stores/AppStore";
import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {RouteProps} from "react-router";

const menuButtonStyle = {
    "height": "50px"
};

export interface MenuClassProps {
    logout: () => void;
    loggedIn: boolean;
    authStatus: ReducerStateStatus;
}

class MenuClass extends Component<MenuClassProps> {

    constructor(props) {
        super(props);
    }

    buttons = () => {
        if (!this.props.loggedIn) {
            return (
                <Link to={Routes.login}>
                    <Button color="contrast" style={menuButtonStyle}>
                        Login
                    </Button>
                </Link>
            )
        } else {
            return (
                <div>
                    <Button color="contrast" style={menuButtonStyle}
                            onClick={() => this.props.logout()}>
                        Log Out
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
                            <Button color="contrast" style={menuButtonStyle}
                            >Askalot</Button>
                        </Link>
                        <Link to={Routes.question}>
                            <Button color="contrast" style={menuButtonStyle}>
                                Questions
                            </Button>
                        </Link>
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
    (state: AppStoreState) => ({loggedIn: state.auth.loggedIn, authStatus: state.auth.status}),
    (dispatch) => ({logout: () => dispatch(AuthActions.logout())})
)(MenuClass);