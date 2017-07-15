import * as React from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Button from "material-ui/Button";
import Typography from 'material-ui/Typography';
import {CSSProperties} from "react";
interface props {
    data: DropDownSelectData[];
    placeholder? : string;
}

export interface DropDownSelectData {
    text: string;
    value: any;
}

const defaultStyles = {
    width: 200,
    height: 40
};

export class DropDownSelect extends React.Component<props, any>{
    state = {
        anchorEl: undefined,
        open: false,
        value: undefined
    };

    button = undefined;

    handleClick = (event) => {
        this.setState({ open: true, anchorEl: this.refs.menuPlaceHolder });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    onSelectValue = (value: any) => {
        this.setState({value: value, open: false});
    };

    render() {
        const selected = this.props.data.filter((data) => data.value == this.state.value)[0];
        const placeholder = this.props.placeholder? this.props.placeholder : "";
        const style = defaultStyles;
        const border: CSSProperties = {borderBottom: "lightgrey 1px solid", borderTop: "lightgrey 1px solid"};
        return (
            <div>
                <div style={{height: style.height}}>
                    <Button style={{...style, ...border, textTransform:"none"}} onClick={this.handleClick}>
                        {selected? selected.text: placeholder}
                    </Button>
                </div>
                <div ref="menuPlaceHolder" style={{height:0, marginTop: 20, left: -16}}></div>
                <Menu
                    MenuListProps={{style:{padding: 0}}}
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    {this.props.data.map((data) => (
                        <MenuItem key={data.value} onClick={() => this.onSelectValue(data.value)} style={style}>
                            {data.text}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        )
    }
}
