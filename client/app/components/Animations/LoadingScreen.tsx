import * as React from "react";
import Grid from "material-ui/Grid";
import {CircularProgress} from "material-ui/Progress";

export class LoadingScreen extends React.Component<any> {
    render() {
        return (
            <Grid container justify="center" align="center" style={{height: "100%", width: "100%"}}>
                <Grid item style={{padding: "200px 0"}}>
                    <CircularProgress
                        size={150}
                    />
                </Grid>
            </Grid>
        )
    }
}