import * as Reaact from 'react';
import * as React from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';

interface props {
    data: DropDownSelectData[];
}

export interface DropDownSelectData {
    text: string;
    value: any;
}

export class DropDownSelect extends Reaact.Component<props, any>{
    state = {
        anchorEl: undefined,
        open: false,
        value: undefined
    };

    button = undefined;

    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    onSelectValue = (value: any) => {
        this.setState({value: value, open: false});
    };

    render() {
        const selected = this.props.data.filter((data) => data.value == this.state.value)[0];
        return (
            <div>
                <div style={{height: 30, width: 200, border: "black 1px solid"}} onClick={this.handleClick}>
                    {selected? selected.text: ""}
                </div>
                <Menu
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    {this.props.data.map((data) => (
                        <MenuItem key={data.value} onClick={() => this.onSelectValue(data.value)}>
                            {data.text}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        )
    }
}
