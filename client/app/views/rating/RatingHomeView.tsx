import * as React from "react";
import {connect} from "react-redux";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import {CustomLink} from "../../components/CustomLink";
import {Routes} from "../../constants/Routes";
import {RatingActions} from "../../actions/RatingActions";
import {AppStoreState} from "../../stores/AppStore";
// TODO

export class RatingHomeViewComponent extends React.Component<any> {
    componentWillMount() {
        this.props.fetchRatingPreviews();
    }
    render() {
        console.log(this.props.ratingPreviews);
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

const mapDispatchToProps = (dispatch) => ({
   fetchRatingPreviews : () => dispatch(RatingActions.getTeammateRecordPreview())
});

const mapStateToProps = (state: AppStoreState) => ({
   ratingPreviews: state.teammateRating.previews
});

export const RatingHomeView = connect<any, any, any>(
    mapStateToProps,
    mapDispatchToProps
)(RatingHomeViewComponent);