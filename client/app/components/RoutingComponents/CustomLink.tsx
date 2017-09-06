import * as React from "react";
import {Link, LinkProps} from "react-router-dom";
const style = {
    textDecoration: "None"
};

export class CustomLink extends React.Component<LinkProps> {
    render() {
        let tempProps = {...this.props};
        delete tempProps.children;
        return (
            <Link {...tempProps} style={style}>
                {this.props.children}
            </Link>
        )
    }
}