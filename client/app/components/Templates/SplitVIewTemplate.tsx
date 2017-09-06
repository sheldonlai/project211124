import * as React from "react";
import Grid from "material-ui/Grid";
import {CSSProperties, ReactNode} from "react";

interface props {
    style?: CSSProperties;
    children: ReactNode[];
}

export class SplitVIewTemplate extends React.Component<props> {

    componentWillReceiveProps(nextProps: props) {
        const len = this.props.children.length;
        if (len > 2) {
            console.warn("SplitVIewTemplate expects two child components, but received " + len, console.trace())
        }
    }

    render() {
        return <Grid container justify="center" direction="row-reverse" style={this.props.style}>
            <Grid item xs={12} md={3} lg={2}>
                {this.props.children[1]}
            </Grid>
            <Grid item xs={12} md={9} lg={8}>
                {this.props.children[0]}
            </Grid>
        </Grid>

    }
}