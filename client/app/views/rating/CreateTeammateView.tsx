import * as React from "react";
import {CSSProperties} from "react";
import {connect} from "react-redux";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
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
            academicInfo: undefined,
            ratings: [],
            showDesHint: false
        }
    }

    render() {
        const textFieldMargin : CSSProperties = {
            marginBottom: 10
        };
        return (
            <div style={{padding: 10, marginTop: 20}}>
                <Grid container justify="center" direction="row-reverse">
                    <Grid item xs={12} md={3} lg={2}>
                    </Grid>
                    <Grid item xs={12} md={8} lg={6}>
                        <div>
                            <Paper style={{padding: "20px"}}>
                                <Typography type="display1">
                                    Describe your teammate
                                </Typography>
                                <TextField
                                    label="First name"
                                    value={this.state.firstName}
                                    onChange={(event) => this.setState({firstName: event.target.value})}
                                    inputProps={EmailNameInputStyles}
                                    style={textFieldMargin}
                                /><br/>
                                <TextField
                                    label="Last name"
                                    value={this.state.lastName}
                                    onChange={(event) => this.setState({lastName: event.target.value})}
                                    inputProps={EmailNameInputStyles}
                                    style={textFieldMargin}
                                /><br/>
                                {
                                    this.state.showDesHint &&
                                    <Typography type="caption">
                                        This will allow people to recognize your teammate. A simple non-sensitive
                                        description would be sufficient
                                    </Typography>
                                }
                                <TextField
                                    onFocus={() => this.setState({showDesHint: true})}
                                    onBlur={() => this.setState({showDesHint: false})}
                                    label="Description"
                                    value={this.state.description}
                                    multiline
                                    rows={3}
                                    fullWidth
                                    onChange={(event) => this.setState({description: event.target.value})}
                                    style={textFieldMargin}
                                /><br/>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Button style={{margin: "10px 0px"}}>
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