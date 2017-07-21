import * as React from "react";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import {CSSProperties} from "react";
import TextField from "material-ui/TextField";
import {isNullOrUndefined} from "util";
import Grid from "material-ui/Grid";
interface props {
    label: string;
    value: string;
    onChange: (text: string) => any;
}

export class OptionalTextFieldEditor extends React.Component<props> {

    onChange = (event) => {
        this.props.onChange(event.target.value);
    };

    render() {
        const containerStyle: CSSProperties = {height: 50, display: "inline-block", margin: "10px 0"};
        return (
            <Grid container style={containerStyle} justify="center" align="center" gutter={0} direction="row">
                <Grid item>
                {
                    (isNullOrUndefined(this.props.value))?
                        <Button style={{width:"100%", padding: "0"}} onClick={()=> this.props.onChange("")}>Add {this.props.label}</Button>
                        :
                        <div>
                            <TextField
                                value={this.props.value}
                                label={this.props.label}
                                onChange={this.onChange}
                            />
                        </div>
                }
                </Grid>
            </Grid>
        );
    }
}