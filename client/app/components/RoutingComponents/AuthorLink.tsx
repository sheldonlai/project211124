import * as React from "react";
import Typography from "material-ui/Typography/Typography";
import {USERNAME_COLOR} from "../../styles/Colors";
import {CustomLink} from "./CustomLink";
import {Routes} from "../../constants/Routes";

interface props {
    username: string;
    fontSize?: number;
}

export class AuthorLink extends React.Component<props>{
    render() {
        return (
            <CustomLink to={Routes.profile.replace(':username', this.props.username)}>
                <Typography style={{color: USERNAME_COLOR , display: "inline-block", fontSize: this.props.fontSize}}>
                    {this.props.username}
                </Typography>
            </CustomLink>

        )
    }
}