import IconButton from "material-ui/IconButton/IconButton";
import Toolbar from "material-ui/Toolbar/Toolbar";
import Icon from "material-ui/Icon";
import Button from "material-ui/Button/Button";
import * as React from "react";
import {CSSProperties} from "react";
import {MenuButton} from "./subcomponents/MenuButton";
import {Routes} from "../../constants/Routes";
import {UserTypeEnum} from "../../../../server/enums/UserTypeEnum";
import {UserDto} from "../../../../server/dtos/auth/UserDto";
import {menuButtonStyle} from "./MenuButtonStyles";

interface props {
    openMenu: () => void;
    collapsed: boolean;
    user: UserDto;
    handleMenuClick: (route: string) => void;


}

export class SmallMenu extends React.Component<props> {
    render() {
        return (
            <div>
                <Toolbar>
                    <IconButton color="contrast"
                                aria-label="Menu"
                                onClick={this.props.openMenu}
                    >
                        <Icon>menu</Icon>
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
                    !this.props.collapsed &&
                    <div>
                        {MenuButton("Questions", Routes.question, true)}
                        {MenuButton("Stories", Routes.story, true)}
                        {MenuButton("People", Routes.people, true)}

                        {
                            this.props.user ?
                                <div>
                                    {MenuButton("Profile", Routes.my_profile, true)}

                                    {
                                        this.props.user.role === UserTypeEnum.ADMIN &&
                                        MenuButton("Admin", Routes.admin, true)
                                    }
                                    <Button color="contrast"
                                            style={{...menuButtonStyle, width: "100%"}}
                                            onClick={() => this.props.handleMenuClick('logout')}>
                                        Log Out
                                    </Button>
                                </div> :
                                MenuButton("Login", Routes.login, true)
                        }
                    </div>
                }
            </div>
        )
    }
}