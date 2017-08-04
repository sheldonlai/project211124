import * as React from "react";
import {connect} from "react-redux";
import Grid from "material-ui/Grid";
import {RatingActions} from "../../actions/RatingActions";
import {AppStoreState} from "../../stores/AppStore";
import Typography from "material-ui/Typography";
import ReactStars from 'react-stars';
import {CardActions, CardContent} from 'material-ui/Card';
import {ReducerStateStatus} from "../../constants/ReducerStateStatus";
import {LoadingScreen} from "../../components/Animations/LoadingScreen";
import {SplitVIewTemplate} from "../../components/Templates/SplitVIewTemplate";
import {TeammateRatingDto} from "../../../../server/dtos/rating/TeammateRatingDto";
import {TeammateRecordDto} from "../../../../server/dtos/rating/TeammateRecordDto";
import {RouteComponentProps} from "react-router";
import {TeammateLocationEditor} from "./subcomponents/TeammateLocationEditor";
import Paper from "material-ui/Paper";
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";

interface props extends StateToProps, DispatchToProps, RouteComponentProps<{ id: string }> {
}

export class RatingViewComponent extends React.Component<props, any> {
    componentWillMount() {
        const id = this.props.match.params.id;
        if (!id)
            console.error("No id is specified");
        if (!this.props.ratingPage || this.props.ratingPage._id != id)
            this.props.fetchTeammateRecord(id)
    }

    getAverageRating() {
        let sum = 0;
        for (let rating of this.props.ratingPage.ratings) {
            sum += rating.rating;
        }
        let avgRating = sum / this.props.ratingPage.ratings.length;
    }

    render() {
        const record = this.props.ratingPage;
        return (
            <div style={{padding: 10}}>
                <SplitVIewTemplate>
                    {
                        this.props.ratingPageStatus == ReducerStateStatus.LOADING ?
                            <LoadingScreen/> :
                            <div>
                                <Grid container justify="flex-end">
                                    <Grid item xs={12}>
                                        <Paper style={{padding: 20}}>
                                        <Typography type="display3" style={{textTransform: "capitalize"}}>
                                            {record.firstName + " " + record.lastName}
                                        </Typography>
                                        <Typography type="caption">
                                            Average Rating
                                        </Typography>
                                        <ReactStars size={34} value={this.getAverageRating()} edit={false}/>
                                        <TeammateLocationEditor
                                            academicInfo={record.academicInfo}
                                            city={record.city}
                                            onAcademicChange={undefined}
                                            editable={false}
                                        />
                                        <Typography type="caption">
                                            Description
                                        </Typography>
                                        <Typography type="body1">
                                            {record.description}
                                        </Typography>
                                        </Paper>
                                    </Grid>
                                    <div key="edit-answer-button" style={{float: 'right', marginTop: 5}}>
                                        <Button fab color="primary">
                                            <AddIcon/>
                                        </Button>
                                    </div>
                                </Grid>
                            </div>
                    }
                    <div/>
                </SplitVIewTemplate>
            </div>
        )
    }
}

interface DispatchToProps {
    fetchTeammateRecord: (id: string) => void;
    addRating: (rating: TeammateRatingDto, id: string) => void;
    editRating: (rating: TeammateRatingDto, id: string) => void;

}

const mapDispatchToProps = (dispatch): DispatchToProps => ({
    fetchTeammateRecord: (id) => dispatch(RatingActions.getTeammateRecord(id)),
    addRating: (rating: TeammateRatingDto, id: string) => dispatch(RatingActions.addRating(rating, id)),
    editRating: (rating: TeammateRatingDto, id: string) => dispatch(RatingActions.editRating(rating, id)),

});

interface StateToProps {
    ratingPageStatus: ReducerStateStatus;
    ratingPage: TeammateRecordDto;
}

const mapStateToProps = (state: AppStoreState): StateToProps => ({
    ratingPageStatus: state.ratingPage.status,
    ratingPage: state.ratingPage.record
});

export const RatingPageView = connect<StateToProps, DispatchToProps, RouteComponentProps<{ id: string }>>(
    mapStateToProps,
    mapDispatchToProps
)(RatingViewComponent);