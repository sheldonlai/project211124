import * as React from 'react';
import Menu, {MenuItem} from 'material-ui/Menu';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Button from "material-ui/Button";
import Typography from 'material-ui/Typography';
import {CSSProperties} from "react";

interface props {
    buttons: ButtonData[];
    defaultButtonIndex: number;
    buttonStyle?: CSSProperties;
}

export type MuiButtonColorType = 'default' | 'inherit' | 'primary' | 'accent' | 'contrast';

export class ButtonData {
    text: string;
    color?: MuiButtonColorType;
    onClick?: () => void;

    constructor(text: string, onClick?: () => void, color?: MuiButtonColorType) {
        this.text = text;
        this.onClick = onClick ? onClick : () => {
        };
        this.color = color ? color : "default";
    }
}

const defaultStyles: CSSProperties = {
    width: 200,
    height: 40,
    justifyContent: "flex-start"
};

// Temporary bu until Material UI finish implementing theirs
export class ButtonMenu extends React.Component<props, any> {
    state = {
        anchorEl: undefined,
        open: false
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    handleClick = (event, callBack: () => void) => {
        this.setState({open: true, anchorEl: this.refs.menuPlaceHolder});
        if (callBack)
            callBack();
    };

    render() {
        const defaultButton = this.props.buttons[this.props.defaultButtonIndex];
        const style = this.props.buttonStyle ? this.props.buttonStyle : {};
        return (
            <div>
                <Button color={defaultButton.color}
                        onClick={(event) => this.handleClick(event, defaultButton.onClick)}
                        style={style}>
                    {defaultButton.text}
                </Button>
                <div ref="menuPlaceHolder" style={{height: 0, marginTop: 20, left: -16}}></div>
                <Menu
                    MenuListProps={{style: {padding: 0}}}
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    {this.props.buttons
                        .filter((data, index) => index !== this.props.defaultButtonIndex)
                        .map((data, index) => (
                            <MenuItem key={data.text} style={style} onClick={data.onClick()}>
                                {data.text}
                                {/*<Button color={data.color}>{data.text}</Button>*/}
                            </MenuItem>
                        ))
                    }
                </Menu>
            </div>
        )
    }
}
