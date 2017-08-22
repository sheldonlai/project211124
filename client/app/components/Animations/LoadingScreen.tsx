import * as React from "react";
import Grid from "material-ui/Grid";
import {CircularProgress} from "material-ui/Progress";

interface props {
    padding? : number;
    size? : number;
}
export class LoadingScreen extends React.Component<any> {
    render() {
        const padding = this.props.padding? this.props.padding: 200;
        const size = this.props.size? this.props.size: 150;
        return (
            <Grid container justify="center" align="center" style={{height: "100%", width: "100%"}}>
                <Grid item style={{padding: padding + "px 0"}}>
                    <CircularProgress
                        size={size}
                    />
                </Grid>
            </Grid>
        )
    }
}