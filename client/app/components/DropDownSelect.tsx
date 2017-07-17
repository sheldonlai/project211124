import * as React from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Button from "material-ui/Button";
import Typography from 'material-ui/Typography';
import {CSSProperties} from "react";
interface props {
    data: DropDownSelectData[];
    defaultValue?: any;
    placeholder? : string;
    onChange? : (element: any) => void;
    disable? : boolean;
}

export interface DropDownSelectData {
    text: string;
    value: any;
}

const defaultStyles : CSSProperties= {
    width: 200,
    height: 40,
    justifyContent: "flex-start"
};

// Temporary component until Material UI finish implementing theirs
export class DropDownSelect extends React.Component<props>{
    state = {
        anchorEl: undefined,
        open: false,
        value: this.props.defaultValue
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
        if (this.props.onChange)
            this.props.onChange(value);
    };

    render() {
        const selected = this.props.data.filter((data) => data.value == this.state.value)[0];
        const placeholder = this.props.placeholder? this.props.placeholder : "";
        const style = defaultStyles;
        const border: CSSProperties = {borderBottom: "lightgrey 1px solid"};
        return (
            <div style={{margin: "10px 0px"}}>
                {placeholder && <Typography type="caption" gutterBottom>{placeholder}</Typography>}
                <div style={{height: style.height}}>
                    <Button style={{...style, ...border, textTransform:"none", paddingLeft: 0, fontWeight: 400 }}
                            disable={this.props.disable}
                            onClick={this.handleClick}>
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
