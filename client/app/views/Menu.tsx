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
import {UserTypeEnum} from "../../../server/enums/UserTypeEnum";
import Dialog from "material-ui/Dialog/Dialog";
import Slide from "material-ui/transitions/Slide";
import DialogTitle from "material-ui/Dialog/DialogTitle";
import DialogContent from "material-ui/Dialog/DialogContent";
import DialogContentText from "material-ui/Dialog/DialogContentText";
import DialogActions from "material-ui/Dialog/DialogActions";

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
                this.setState({dialogOpen: true});
                // this.props.logout();
                break;
            default:
                this.props.history.push(key)
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
                    <div id="menu-drop-down-button">
                        <Button color="contrast"
                                style={menuButtonStyle}
                                onClick={() => this.setState({open: true})}
                        >
                            {this.props.user.email}
                        </Button>
                    </div>

                    <Menu
                        id="lock-menu"
                        anchorEl={document.getElementById("menu-drop-down-button")}
                        open={this.state.open}
                        onRequestClose={this.handleRequestClose}
                    >
                        <MenuItem
                            onClick={() => this.handleMenuClick(Routes.my_profile)}
                            selected={false}>
                            Profile
                        </MenuItem>
                        {
                            this.props.user.role === UserTypeEnum.ADMIN &&
                            <MenuItem onClick={() => this.handleMenuClick(Routes.admin)} selected={false}>
                                Admin
                            </MenuItem>
                        }

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

                    <Button type="title" color="inherit"
                            style={{
                                textAlign: 'center', ...menuButtonStyle,
                                fontSize: 20
                            }}>
                            Askalot
                    </Button>


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

                                    {
                                        this.props.user.role === UserTypeEnum.ADMIN &&
                                        this.button("Admin", Routes.admin, true)
                                    }
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

    logoutDialog = () => {
        return (
            <Dialog open={this.state.dialogOpen} transition={Slide} onRequestClose={this.handleRequestClose}>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.setState({dialogOpen: false})} color="primary">
                        No
                    </Button>
                    <Button onClick={() => {
                        this.props.logout();
                        this.setState({dialogOpen: false});
                    }} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

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
                {this.logoutDialog()}
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