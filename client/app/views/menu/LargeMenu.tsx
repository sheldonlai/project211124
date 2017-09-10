import * as React from "react";
import Toolbar from "material-ui/Toolbar/Toolbar";
import {CustomLink} from "../../components/RoutingComponents/CustomLink";
import {Routes} from "../../constants/Routes";
import Button from "material-ui/Button/Button";
import Typography from "material-ui/Typography";
import {CSSProperties} from "react";
import {menuButtonStyle} from "./MenuButtonStyles";
import {MenuButton} from "./subcomponents/MenuButton";
import Menu from "material-ui/Menu/Menu";
import MenuItem from "material-ui/Menu/MenuItem";
import {UserTypeEnum} from "../../../../server/enums/UserTypeEnum";
import {UserDto} from "../../../../server/dtos/auth/UserDto";


interface props {
    loggedIn: boolean
    handleRequestClose: () => void;
    handleMenuClick: (route: string) => void;
    openMenu : () => void;
    open: boolean;
    user: UserDto;
}
export class LargeMenu extends React.Component<props> {
    buttons = () => {
        if (!this.props.loggedIn) {
            return MenuButton("Login", Routes.login)
        } else {
            return (
                <div>
                    <div id="menu-drop-down-button">
                        <Button color="contrast"
                                style={menuButtonStyle}
                                onClick={this.props.openMenu}
                        >
                            {this.props.user.email}
                        </Button>
                    </div>

                    <Menu
                        id="lock-menu"
                        anchorEl={document.getElementById("menu-drop-down-button")}
                        open={this.props.open}
                        onRequestClose={this.props.handleRequestClose}
                    >
                        <MenuItem
                            onClick={() => this.props.handleMenuClick(Routes.my_profile)}
                            selected={false}>
                            Profile
                        </MenuItem>
                        {
                            this.props.user.role === UserTypeEnum.ADMIN &&
                            <MenuItem onClick={() => this.props.handleMenuClick(Routes.admin)} selected={false}>
                                Admin
                            </MenuItem>
                        }

                        <MenuItem
                            selected={false}
                            onClick={() => this.props.handleMenuClick('logout')}
                        >
                            <div style={{width: 150}}>Log Out</div>
                        </MenuItem>

                    </Menu>
                </div>
            )
        }
    };

    render() {
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
                    {MenuButton("Questions", Routes.question)}
                    {MenuButton("Stories", Routes.story)}
                    {MenuButton("People", Routes.people)}
                    {MenuButton("People new", Routes.people_new)}
                </div>
                <div>
                    {this.buttons()}
                </div>
            </Toolbar>
        )
    }

}