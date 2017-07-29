import * as React from "react";
import {connect} from "react-redux";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import {CustomLink} from "../../components/CustomLink";
import {Routes} from "../../constants/Routes";
// TODO

export class RatingHomeViewComponent extends React.Component<any> {
    render() {
        return (
            <div style={{padding: 10}}>
                <Grid container justify="center" direction="row-reverse">
                    <Grid item xs={12} md={3} lg={2}>
                    </Grid>
                    <Grid item xs={12} md={8} lg={6}>
                        <div>
                            <CustomLink to={Routes.create_teammate_record}>
                                <Button raised>Create A Teammate Record</Button>
                            </CustomLink>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export const RatingHomeView = connect<any, any, any>(
    () => ({})
)(RatingHomeViewComponent);