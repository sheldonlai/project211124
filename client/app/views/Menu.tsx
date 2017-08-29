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
import Menu, {MenuItem} from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';

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
}

class MenuClass extends Component<MenuClassProps, state> {

    state = {
        open: false,
        width: 0,
        collapsed: true
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    button = (text: string, to: string, fullWidth?: boolean) => (
        <CustomLink to={to}>
            <Button color="contrast" style={{...menuButtonStyle, width: fullWidth ? "100%" : undefined}}>
                {text}
            </Button>
        </CustomLink>
    );

    navigateTo = (url: string) => {
        this.props.history.push(url);
    };

    handleMenuClick = (key: string) => {
        switch (key) {
            case 'logout':
                this.props.logout();
                break;
            case 'profile':
                break;
            default:
                break;
        }
        this.setState({open: false});
    };

    buttons = () => {
        if (!this.props.loggedIn) {
            return this.button("Login", Routes.login)
        } else {
            return (
                <div>
                    <Button id="menu-drop-down-button" color="contrast"
                            style={menuButtonStyle}
                            onClick={() => this.setState({open: true})}
                    >
                        {this.props.user.email}
                    </Button>
                    <Menu
                        id="lock-menu"
                        anchorEl={document.getElementById("menu-drop-down-button")}
                        open={this.state.open}
                        onRequestClose={this.handleRequestClose}
                    >
                        <MenuItem
                            onClick={() => this.handleMenuClick('profile')}
                            selected={false}>
                            <CustomLink
                                to={Routes.my_profile}>
                                Profile
                            </CustomLink>
                        </MenuItem>
                        <MenuItem onClick={() => this.handleMenuClick('admin')} selected={false}>
                            <CustomLink to={Routes.admin}>
                                Admin
                            </CustomLink>
                        </MenuItem>

                        <MenuItem
                            selected={false}
                            onClick={() => this.handleMenuClick('logout')}
                        >
                            <div style={{width: 150}}>Log Out</div>
                        </MenuItem>

                    </Menu>
                </div>
            )
        }
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

    largeMenu = () => {
        return (
            <Toolbar style={{paddingLeft: 10, paddingRight: 10}}>
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
                    {this.button("Teammate", Routes.rate_my_teammate)}
                </div>
                <div>
                    {this.buttons()}
                </div>
            </Toolbar>
        )
    };

    smallMenu = () => {
        return (
            <div>
                <Toolbar>
                    <IconButton color="contrast"
                                aria-label="Menu"
                                onClick={this.openMenu}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography type="title" color="inherit">
                        Askalot
                    </Typography>

                </Toolbar>
                {
                    !this.state.collapsed &&
                    <div>
                        {this.button("Questions", Routes.question, true)}
                        {this.button("Stories", Routes.story, true)}
                        {this.button("Teammate", Routes.rate_my_teammate, true)}

                        {
                            this.props.loggedIn ?
                                <div>
                                    {this.button("Profile", Routes.my_profile, true)}
                                    {this.button("Admin", Routes.admin, true)}
                                    <Button color="contrast"
                                             style={{...menuButtonStyle, width: "100%"}}
                                             onClick={() => this.handleMenuClick('logout')}>
                                        Log Out
                                    </Button>
                                </div> :
                                this.button("Login", Routes.login, true)
                        }
                    </div>
                }
            </div>
        )
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

                {!smallScreen ?
                    this.largeMenu() :
                    this.smallMenu()
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