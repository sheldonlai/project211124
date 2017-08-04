import * as React from "react";
import Typography from "material-ui/Typography";

interface props {
    label: string;
    value: string;
}

export class DisplayField extends React.Component<props>{
    render () {
        return (
            <div style={{marginTop: 20}}>
                <Typography type="caption" gutterBottom>
                    {this.props.label}
                </Typography>
                <Typography type="body1" gutterBottom>
                    {this.props.value}
                </Typography>
            </div>
        )
    }

}