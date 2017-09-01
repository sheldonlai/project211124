import * as React from "react";
import ReactStars from 'react-stars';
import Typography from "material-ui/Typography";
import {CardActions, CardContent} from 'material-ui/Card';
import {TeammateRatingDto} from "../../../../../server/dtos/rating/TeammateRatingDto";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import {connect} from "react-redux";
import {RatingActions} from "../../../actions/RatingActions";
import Grid from "material-ui/Grid";
import {AppStoreState} from "../../../stores/AppStore";
import {ReducerStateStatus} from "../../../constants/ReducerStateStatus";
import {SatisfactionComponent} from "../../../components/Satisfaction/SatisfactionComponent";
import {convertDateTimeToString, convertDateToString} from "../../../utils/DateUtils";
import {FooterComponent} from "../../../components/Footer/FooterComponent";

interface props {
    user: UserDto,
    rating: TeammateRatingDto;
    recordId: string;
    onRatingChange: (rating: TeammateRatingDto) => void;
    onCancel: () => void;
}

interface StateToProps {
    ratings: TeammateRatingDto[];
    status: ReducerStateStatus;
}

interface DispatchToProps {
    addRating: (rating: TeammateRatingDto) => void;
    updateRating: (rating: TeammateRatingDto) => void;
}

interface state {
    edit: boolean;
}


export class RatingBox extends React.Component<props & DispatchToProps& StateToProps, state> {

    constructor(props) {
        super(props);
        this.state = {
            edit: this.props.rating._id === undefined
        }
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        let filter = this.props.ratings.filter((e)=> e._id === this.props.rating._id);
        if (this.props.status === ReducerStateStatus.LOADING && nextProps.status === ReducerStateStatus.DONE) {
            this.setState({ edit: this.props.rating._id === undefined});
        }
    }

    onRatingChange = (field: string, value: any) => {
        let rating = {...this.props.rating};
        rating[field] = value;
        this.props.onRatingChange(rating);
    };

    submit = () => {
        if (this.props.rating._id) {
            this.props.updateRating(this.props.rating);
        } else {
            this.props.addRating(this.props.rating);
        }
    };

    cancelChange = () => {
        this.setState({edit: false});
        this.props.onCancel();
    };

    render() {
        const user = this.props.user;
        const rating = this.props.rating;
        const editable = user && rating.createdBy._id === user._id;
        const edit = this.state.edit;
        return (
            <Grid item xs={12}>
                <Paper style={{padding: 10}}>
                    {!edit && editable &&
                    <Button style={{float: "right"}} color="primary" onClick={() => this.setState({edit: true})}>
                        Edit
                    </Button>
                    }
                    {edit &&
                    <div>
                        <Button style={{float: "right"}} color="primary" onClick={this.submit}>
                            save
                        </Button>
                        <Button style={{float: "right"}} color="primary" onClick={this.cancelChange}>
                            Cancel
                        </Button>
                    </div>

                    }
                    <Typography type="caption">
                        Rating
                    </Typography>
                    <SatisfactionComponent
                        readonly={!this.state.edit}
                        satisfy={rating.satisfied}
                        onNotSatisfyClick={() => this.onRatingChange("satisfied", false)}
                        onSatisfyClick={() => this.onRatingChange("satisfied", true)}
                    />
                    <Divider/>
                    {
                        edit ?
                            <TextField
                                label="Comment"
                                value={rating.comment}
                                multiline
                                rows={3}
                                fullWidth
                                onChange={(event) => this.onRatingChange("comment", event.target.value)}
                            /> :
                            <Typography type="body1" style={{minHeight: 60}}>
                                {rating.comment}
                            </Typography>
                    }

                    <Divider/>
                    <FooterComponent by={rating.createdBy.username} date={rating.createdAt} />
                </Paper>
            </Grid>
        )
    }
}


export const RatingBoxView = connect<StateToProps, DispatchToProps, props>(
    (state: AppStoreState) => ({
        status: state.ratingPage.status,
        ratings: state.ratingPage.record.ratings
    }),
    (dispatch, props: props): DispatchToProps => ({
        addRating: (rating: TeammateRatingDto) => dispatch(RatingActions.addRating(rating, props.recordId)),
        updateRating: (rating: TeammateRatingDto) => dispatch(RatingActions.updateRating(rating, props.recordId)),
    })
)(RatingBox);
