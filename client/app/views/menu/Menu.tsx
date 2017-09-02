import * as React from "react";
import {Component, CSSProperties} from "react";
import {Routes} from "../../constants/Routes";
import {AuthActions} from "../../actions/AuthActions";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {ReducerStateStatus} from "../../constants/ReducerStateStatus";
import {RouteComponentProps} from "react-router";
import AppBar from 'material-ui/AppBar';
import {UserDto} from "../../../../server/dtos/auth/UserDto";
import {LogoutDialog} from "./subcomponents/LogoutDialog";
import {LargeMenu} from "./LargeMenu";
import {SmallMenu} from "./SmallMenu";

const menuButtonStyle: CSSProperties = {
    height: "50px",
    textTransform: "none"
};


export interface MenuClassProps extends RouteComponentProps<{}> {
    logout: () => void;
    loggedIn: boolean;
    authStatus: ReducerStateStatus;
    user: UserDto;
}

interface state {
    open: boolean,
    width: number;
    collapsed: boolean;
    dialogOpen: boolean;
}

class MenuClass extends Component<MenuClassProps, state> {

    state = {
        open: false,
        width: 0,
        collapsed: true,
        dialogOpen: false
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    navigateTo = (url: string) => {
        this.props.history.push(url);
    };

    handleMenuClick = (key: string) => {
        switch (key) {
            case 'logout':
                this.setState({dialogOpen: true});
                // this.props.logout();
                break;
            default:
                this.props.history.push(key)
                break;
        }
        this.setState({open: false});
    };

    getColor = () => {
        let pathName = this.props.location.pathname;
        if (pathName === Routes.home) {
            return "#FF6526";
        } else if (pathName.indexOf(Routes.question) !== -1) {
            return "#6bb4f8";
        } else if (pathName.indexOf(Routes.story) !== -1) {
            return "#3066f8";
        } else {
            return "#37474F";
        }

    };


    openMenu = () => {
        this.setState({collapsed: !this.state.collapsed});
    };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({width: window.innerWidth});
    };


    render() {
        let color = this.getColor();
        const smallScreen = this.state.width <= 650;
        return (
            <AppBar position="static" className="menu" style={{backgroundColor: color}}>
                <LogoutDialog open={this.state.dialogOpen}
                              onCancel={() => this.setState({dialogOpen: false})}
                              onLogout={() => {
                                  this.props.logout();
                                  this.setState({dialogOpen: false});
                              }}/>
                {!smallScreen ?
                    <LargeMenu loggedIn={this.props.loggedIn}
                               handleRequestClose={this.handleRequestClose}
                               handleMenuClick={this.handleMenuClick}
                               openMenu={() => this.setState({open: true})}
                               open={this.state.open} user={this.props.user}/>:
                    <SmallMenu openMenu={this.openMenu}
                               collapsed={this.state.collapsed}
                               user={this.props.user}
                               handleMenuClick={this.handleMenuClick}/>
                }
            </AppBar>
        )
    }
}

export const MenuView = connect<any, any, any>(
    (state: AppStoreState) => ({
        loggedIn: state.auth.loggedIn,
        user: state.auth.user,
        authStatus: state.auth.status,
    }),
    (dispatch) => ({logout: () => dispatch(AuthActions.logout())})
)(MenuClass);