import * as React from "react";
import {connect} from "react-redux";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import {EmailNameInputStyles} from "../../constants/StyleClasses";
import TextField from "material-ui/TextField";
import {TeammateRecordDto} from "../../../../server/dtos/rating/TeammateRecordDto";

interface state extends TeammateRecordDto {
    showDesHint: boolean;
}

export class CreateTeammateViewComponent extends React.Component<any, state> {

    constructor(props) {
        super(props);
        this.state = {
            _id: undefined,
            firstName: '',
            lastName: '',
            description: '',
            city: undefined,
            university: undefined,
            year: undefined,
            ratings: [],
            showDesHint: false
        }
    }

    render() {
        return (
            <div style={{padding: 10}}>
                <Grid container justify="center" direction="row-reverse">
                    <Grid item xs={12} md={3} lg={2}>
                    </Grid>
                    <Grid item xs={12} md={8} lg={6}>
                        <div>
                            <Paper style={{width: "100%", padding: "5px 10px"}}>
                                <Typography type="display1">
                                    Create teammate
                                </Typography>
                                <TextField
                                    label="First name"
                                    value={this.state.firstName}
                                    onChange={(event) => this.setState({firstName: event.target.value})}
                                    inputProps={EmailNameInputStyles}
                                /><br/>
                                <TextField
                                    label="Last name"
                                    value={this.state.lastName}
                                    onChange={(event) => this.setState({lastName: event.target.value})}
                                    inputProps={EmailNameInputStyles}
                                /><br/>
                                {
                                    this.state.showDesHint &&
                                    <Typography type="subheading">
                                        This will allow people to recognize your teammate. A simple description would be
                                        sufficient
                                    </Typography>
                                }
                                <TextField
                                    onFocus={() => this.setState({showDesHint: true})}
                                    onBlur={() => this.setState({showDesHint: false})}
                                    label="Appearance Description"
                                    value={this.state.description}
                                    type="password"
                                    multiline={true}
                                    rows={3}
                                    fullWidth
                                    onChange={(event) => this.setState({description: event.target.value})}
                                /><br/>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Button>
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export const CreateTeammateView = connect<any, any, any>(
    () => ({})
)(CreateTeammateViewComponent);