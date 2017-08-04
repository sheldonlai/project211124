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
interface props {
    user: UserDto,
    rating: TeammateRatingDto;
    onRatingChange: (rating) => void;
}

interface state {
    edit: boolean;
}


export class RatingBox extends React.Component<props, state> {

    constructor (props) {
        super(props);
        this.state = {
            edit: false
        }
    }

    onRatingChange = (field: string, value: any) => {
        let rating = {...this.props.rating};
        rating[field] = value;
        this.props.onRatingChange(rating);
    };

    render () {
        const user = this.props.user;
        const rating = this.props.rating;
        const editable = user && rating.createdBy._id === user._id;
        const edit = this.state.edit;
        return (
            <Paper>
                { edit && editable &&
                    <Button style={{float: "right"}} color="primary" onClick={this.setState({edit: true})}>
                        Edit
                    </Button>
                }
                <Typography type="caption">
                    Rating
                </Typography>
                <ReactStars size={24} value={rating.rating} edit={edit}/>
                <Divider/>
                {
                    edit?
                        <TextField
                            label="Comment"
                            value={rating.comment}
                            multiline
                            rows={3}
                            fullWidth
                            onChange={(event) => this.onRatingChange("comment", event.target.value)}
                        /> :
                        <Typography type="body1">
                            {rating.comment}
                        </Typography>
                }

                <Divider/>
                <div style={{color: "grey", fontSize: 10, textAlign: "right"}}>
                    {rating.createdAt && <div>Posted on {rating.createdAt}</div>}
                    <br/>
                    by {rating.createdBy.username}
                </div>
            </Paper>
        )
    }
}
