import * as React from "react";
import {connect} from "react-redux";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import {CustomLink} from "../../components/CustomLink";
import {Routes} from "../../constants/Routes";
import {RatingActions} from "../../actions/RatingActions";
import {AppStoreState} from "../../stores/AppStore";
import {TeammatePreviewDto} from "../../../../server/dtos/rating/TeammatePreviewDto";
import {CardActions, CardContent} from 'material-ui/Card';
import {ReducerStateStatus} from "../../constants/ReducerStateStatus";
import {LoadingScreen} from "../../components/Animations/LoadingScreen";
import {RatingPreviewCard} from "./subcomponents/RatingPreviewCard";

export class RatingHomeViewComponent extends React.Component<StateToProps & DispatchToProps, any> {
    componentWillMount() {
        this.props.fetchRatingPreviews();
    }

    recordRow = (preview: TeammatePreviewDto, index: number) => {
        return (<RatingPreviewCard preview={preview} key={index}/>);
    };

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
                            {
                                this.props.ratingPreviewStatus === ReducerStateStatus.LOADING ?
                                    <LoadingScreen/>:
                                    this.props.ratingPreviews.map((e, i) => this.recordRow(e, i))
                            }
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

interface DispatchToProps {
    fetchRatingPreviews: () => void;
}

const mapDispatchToProps = (dispatch): DispatchToProps => ({
    fetchRatingPreviews: () => dispatch(RatingActions.getTeammateRecordPreview())
});

interface StateToProps {
    ratingPreviewStatus: ReducerStateStatus;
    ratingPreviews: TeammatePreviewDto[]
}

const mapStateToProps = (state: AppStoreState): StateToProps => ({
    ratingPreviewStatus: state.ratingHome.status,
    ratingPreviews: state.ratingHome.previews
});

export const RatingHomeView = connect<StateToProps, DispatchToProps, any>(
    mapStateToProps,
    mapDispatchToProps
)(RatingHomeViewComponent);