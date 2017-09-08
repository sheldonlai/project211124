import * as React from "react";
import Typography from "material-ui/Typography/Typography";
import {USERNAME_COLOR, USERNAME_HOVER_COLOR} from "../../styles/Colors";
import {CustomLink} from "./CustomLink";
import {Routes} from "../../constants/Routes";

interface props {
    username: string;
    fontSize?: number;
}

interface state {
    hover: boolean
}

export class AuthorLink extends React.Component<props, state>{
    state = {hover: false}
    render() {
        return (
            <CustomLink onClick={(event) => event.stopPropagation()}
                        to={Routes.profile.replace(':username', this.props.username)}
                        onMouseEnter={() => this.setState({hover: true})}
                        onMouseLeave={() => this.setState({hover: false})}
            >
                <Typography style={{
                    color: this.state.hover? USERNAME_HOVER_COLOR : USERNAME_COLOR ,
                    display: "inline-block",
                    fontSize: this.props.fontSize}}>
                    {this.props.username}
                </Typography>
            </CustomLink>

        )
    }
}