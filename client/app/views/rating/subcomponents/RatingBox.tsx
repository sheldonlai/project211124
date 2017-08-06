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

interface props {
    user: UserDto,
    rating: TeammateRatingDto;
    recordId: string;
    onRatingChange: (rating: TeammateRatingDto) => void;
    onCancel: () => void;
}

interface StateToProps {
    ratings: TeammateRatingDto[]
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
                    <ReactStars size={24} value={rating.rating}
                                onChange={(num) => this.onRatingChange("rating", num)}/>
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
                    <div style={{color: "grey", fontSize: 10, textAlign: "right"}}>
                        {rating.createdAt && <div>Posted on {rating.createdAt.toLocaleString()}</div>}
                        <br/>
                        by {rating.createdBy.username}
                    </div>
                </Paper>
            </Grid>
        )
    }
}


export const RatingBoxView = connect<StateToProps, DispatchToProps, props>(
    (state: AppStoreState) => ({
        ratings: state.ratingPage.record.ratings
    }),
    (dispatch, props: props): DispatchToProps => ({
        addRating: (rating: TeammateRatingDto) => dispatch(RatingActions.addRating(rating, props.recordId)),
        updateRating: (rating: TeammateRatingDto) => dispatch(RatingActions.updateRating(rating, props.recordId)),
    })
)(RatingBox);
