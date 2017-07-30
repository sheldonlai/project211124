import * as React from "react";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import {CSSProperties} from "react";
import TextField from "material-ui/TextField";
import {isNullOrUndefined} from "util";
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

interface props {
    label: string;
    value: string;
    onChange?: (text: string) => any;
    data?: AutoCompleteData[];
}

export class AutoCompleteData {

}
// TODO to be implemented
export class AutoComplete extends React.Component<props> {

    onChange = (event) => {
        this.props.onChange(event.target.value);
    };

    render() {
        const containerStyle: CSSProperties = {height: 50, display: "inline-block", margin: "10px 0" , width: 300};
        return (
            <div style={containerStyle}>
                <TextField
                    value={this.props.value}
                    label={this.props.label}
                    onChange={this.onChange}
                    fullWidth
                />
                <List>
                    <ListItem>
                        HI
                    </ListItem>
                </List>

            </div>
        );
    }
}