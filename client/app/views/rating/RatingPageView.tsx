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
import {UserDto} from "../../../../server/dtos/auth/UserDto";
import {RatingBox, RatingBoxView} from "./subcomponents/RatingBox";
import {isNullOrUndefined} from "util";
import {SatisfactionComponent} from "../../components/Satisfaction/SatisfactionComponent";
import {DistributionBar} from "../../components/Satisfaction/DistributionBar";
import {UniversityYearEnum} from "../../../../server/enums/UniversityYearEnum";
import {convertEnumStringToViewString, getExpectedYearEnum} from "../../utils/utils";
import {convertDateToString} from "../../utils/DateUtils";

interface DispatchToProps {
    fetchTeammateRecord: (id: string) => void;
    addRating: (rating: TeammateRatingDto, id: string) => void;
    editRating: (rating: TeammateRatingDto, id: string) => void;

}

interface StateToProps {
    ratingPageStatus: ReducerStateStatus;
    ratingPage: TeammateRecordDto;
    user: UserDto;
    lastUpdated: number;
}

interface props extends StateToProps, DispatchToProps, RouteComponentProps<{ id: string }> {
}

interface state {
    record: TeammateRecordDto;
    edit: boolean
}

export class RatingViewComponent extends React.Component<props, state> {
    constructor(props) {
        super(props);
        this.state = {
            record: undefined,
            edit: false
        }
    }

    componentWillMount() {
        const id = this.props.match.params.id;
        if (!id)
            console.error("No id is specified");
        if (!this.props.ratingPage || this.props.ratingPage._id != id || Date.now() - this.props.lastUpdated > 1000)
            this.props.fetchTeammateRecord(id);
        else if (this.props.ratingPage._id != id)
            this.setState({record: {...this.props.ratingPage}});
    }

    componentWillReceiveProps(nextProps: props) {
        if (this.props.lastUpdated !== nextProps.lastUpdated) {
            this.setState({record: {...nextProps.ratingPage}, edit: false});
        }
    }

    updateRating = (rating: TeammateRatingDto) => {
        let record = {...this.state.record};
        record.ratings = record.ratings.map((e) => {
            if (rating._id === e._id) {
                return rating;
            }
            return e;
        });
        this.setState({record});
    };

    addRating = () => {
        let record = {...this.state.record};
        record.ratings.push({
            _id: undefined,
            satisfied: undefined,
            createdBy: this.props.user,
            createdAt: new Date(Date.now()),
            comment: "",
            updatedAt: new Date(Date.now())
        });
        this.setState({record});
    };

    getAverageRating() {
        let sum = 0;
        for (let rating of this.props.ratingPage.ratings) {
            sum += rating.satisfied ? 1 : 0;
        }
        return sum / this.props.ratingPage.ratings.length;
    }

    CancelRatingsEdit = () => {
        let record = {...this.state.record};
        record.ratings = [...this.props.ratingPage.ratings];
        this.setState({record});
    };


    render() {
        const record = this.state.record;
        if (this.props.ratingPageStatus === ReducerStateStatus.LOADING || isNullOrUndefined(record))
            return <LoadingScreen/>;
        const estimatedYear = getExpectedYearEnum(record.year, record.createdAt);
        return (
            <div style={{padding: 10}}>
                <SplitVIewTemplate>
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
                                    <SatisfactionComponent readonly={true} satisfy={undefined}/>
                                    <DistributionBar faction={this.getAverageRating()}/>
                                    <Typography type="headline" gutterBottom>
                                        {record.university.name}
                                    </Typography>
                                    <Typography type="caption">
                                        Year level when created
                                    </Typography>
                                    <Typography type="body1" gutterBottom>
                                        {
                                            convertEnumStringToViewString(UniversityYearEnum[record.year])
                                        }
                                    </Typography>
                                    <Typography type="caption">
                                        Created on
                                    </Typography>
                                    <Typography type="body1" gutterBottom>
                                        {
                                            convertDateToString(record.createdAt)
                                        }
                                    </Typography>
                                    {
                                        estimatedYear !== record.year &&
                                        <div>
                                            <Typography type="caption">
                                                Estimated current year level
                                            </Typography>
                                            <Typography type="body1" gutterBottom>
                                                {
                                                    convertEnumStringToViewString(
                                                        UniversityYearEnum[estimatedYear]
                                                    )
                                                }
                                            </Typography>
                                        </div>
                                    }

                                </Paper>
                            </Grid>
                            {
                                record.ratings.map((e) => {
                                    return <RatingBoxView
                                        key={e._id ? e._id : "new"}
                                        user={this.props.user}
                                        rating={e}
                                        onRatingChange={this.updateRating}
                                        recordId={record._id}
                                        onCancel={this.CancelRatingsEdit}
                                    />
                                })
                            }
                            {
                                !isNullOrUndefined(this.props.user) &&
                                record.ratings.filter((e) =>
                                    e.createdBy._id === this.props.user._id).length < 1 &&
                                <div onClick={this.addRating}
                                     style={{float: 'right', marginTop: 5}}>
                                    <Button fab color="primary">
                                        <AddIcon/>
                                    </Button>
                                </div>
                            }
                        </Grid>
                    </div>

                    <div/>
                </SplitVIewTemplate>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch): DispatchToProps => ({
    fetchTeammateRecord: (id) => dispatch(RatingActions.getTeammateRecord(id)),
    addRating: (rating: TeammateRatingDto, id: string) => dispatch(RatingActions.addRating(rating, id)),
    editRating: (rating: TeammateRatingDto, id: string) => dispatch(RatingActions.updateRating(rating, id)),
});

const mapStateToProps = (state: AppStoreState): StateToProps => ({
    ratingPageStatus: state.ratingPage.status,
    ratingPage: state.ratingPage.record,
    user: state.auth.user,
    lastUpdated: state.ratingPage.lastUpdated
});

export const RatingPageView = connect<StateToProps, DispatchToProps, RouteComponentProps<{ id: string }>>(
    mapStateToProps,
    mapDispatchToProps
)(RatingViewComponent);