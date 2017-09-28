import * as React from 'react';
import {CSSProperties} from 'react';
import Menu, {MenuItem} from 'material-ui/Menu';
import Button from "material-ui/Button";
import Typography from 'material-ui/Typography';
import {MaterialUIColor} from "../../models/MaterialUITypes";

interface props {
    data: DropDownSelectData[];
    value: any;
    placeholder?: string;
    onChange?: (element: any) => void;
    fullWidth? : boolean;
}

export interface DropDownSelectData {
    text: string;
    value: any;
}

const defaultStyles: CSSProperties = {
    width: 200,
    height: 35,
    justifyContent: "flex-start"
};

interface state {
    anchorEl: any;
    open: boolean;
}

// Temporary component until Material UI finish implementing theirs
export class DropDownSelect extends React.Component<props, state> {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: undefined,
            open: false
        }
    }

    button = undefined;

    componentWillReceiveProps(nextProps) {
    }

    handleClick = (event) => {
        this.setState({open: true, anchorEl: this.refs.menuPlaceHolder});
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    onSelectValue = (value: any) => {
        if (this.props.onChange)
            this.props.onChange(value);
        this.setState({open: false});
    };

    bodyContainer = (text: string, color?: MaterialUIColor) => {
        color = color ? color : "default";
        return <Typography type="body1" color={color}>{text}</Typography>
    };

    render() {
        let filter = this.props.data.filter((data) => JSON.stringify(data.value) == JSON.stringify(this.props.value));
        let selected = filter.length ? filter[0] : undefined;
        const placeholder = this.props.placeholder ? this.props.placeholder : "";
        let menuItemStyle = defaultStyles;
        let containerStyle: CSSProperties = {margin: "10px 0", width: 200};
        if (this.props.fullWidth === true) {
            menuItemStyle.width = "100%";
            containerStyle.width = "100%";
        }
        const border: CSSProperties = {borderBottom: "lightgrey 1px solid"};
        return (
            <div style={containerStyle}>
                {placeholder && selected && <Typography type="caption">{placeholder}</Typography>}
                <div style={{height: menuItemStyle.height}}>
                    <Button style={{...menuItemStyle, ...border, textTransform: "none", paddingLeft: 0, fontWeight: 400}}
                            onClick={this.handleClick}>
                        {selected ? this.bodyContainer(selected.text) : this.bodyContainer("Select " + placeholder)}
                    </Button>
                </div>
                <div ref="menuPlaceHolder" style={{height: 0, marginTop: 20, position: "fixed"}}/>
                <Menu
                    MenuListProps={{style: {padding: 0}}}
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    <MenuItem onClick={() => this.onSelectValue(undefined)} style={menuItemStyle}>
                        {this.bodyContainer("Select " + placeholder)}
                    </MenuItem>
                    {this.props.data.map((data) => (
                        <MenuItem key={typeof data.value === "object" ? data.value._id : data.value}
                                  onClick={() => this.onSelectValue(data.value)} style={menuItemStyle}>
                            {this.bodyContainer(data.text,
                                selected && selected.value == data.value ? "accent" : undefined)}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        )
    }
}
