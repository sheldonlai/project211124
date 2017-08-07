import * as React from "react";
import {CSSProperties} from "react";
import {connect} from "react-redux";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import {EmailNameInputStyles, NamesInputStyles} from "../../constants/StyleClasses";
import TextField from "material-ui/TextField";
import {TeammateRecordDto} from "../../../../server/dtos/rating/TeammateRecordDto";
import {TeammateLocationEditor} from "./subcomponents/TeammateLocationEditor";
import {RatingActions} from "../../actions/RatingActions";
import {SplitVIewTemplate} from "../../components/Templates/SplitVIewTemplate";
import {RatingApiController} from "../../api.controllers/RatingApiController";
import {TeammatePreviewDto} from "../../../../server/dtos/rating/TeammatePreviewDto";
import {RatingPreviewCard} from "./subcomponents/RatingPreviewCard";

interface state {
    teammateObj: TeammateRecordDto;
    showDesHint: boolean;
    similarPreviews: TeammatePreviewDto[];
    lastSearched: number;
}

interface props extends DispatchToProps {

}

export class CreateTeammateViewComponent extends React.Component<props, state> {
    private apiController: RatingApiController;

    constructor(props) {
        super(props);
        let obj = {
            _id: undefined,
            firstName: '',
            lastName: '',
            description: '',
            city: undefined,
            university: undefined,
            year: undefined,
            ratings: []
        }
        this.state = {
            teammateObj: obj,
            showDesHint: false,
            similarPreviews: [],
            lastSearched: 0
        };
        this.apiController = RatingApiController.getInstance();
    }

    searchForSimilarTeammate = (teammateRecordDto: TeammateRecordDto) => {
        this.setState({lastSearched: Date.now()})
        this.apiController.searchForTeammate(teammateRecordDto).then((res) => {
            this.setState({similarPreviews: res.data});
        }).catch((err) => {
            console.error(err)
        });
    };

    updateObj = (key, value) => {
        let obj = {...this.state.teammateObj};
        if (typeof  value === "string" && key !== "description")
            value = value.toLocaleLowerCase();
        obj[key] = value;
        this.setState({teammateObj: obj});
        if (Date.now() - this.state.lastSearched > 100) // debounce of 600ms
            this.searchForSimilarTeammate(this.state.teammateObj);
    };

    onSubmit = () => {
        let teammate = this.state.teammateObj;
        this.props.createTeammate(teammate);
    };

    render() {
        const textFieldMargin: CSSProperties = {
            marginBottom: 10
        };
        const teammate = this.state.teammateObj;
        const nameStyle: CSSProperties = {...textFieldMargin, textTransform: "capitalize"};

        return (
            <div style={{padding: 10, marginTop: 20}}>
                <SplitVIewTemplate>
                    <div>
                        <Paper style={{padding: "20px"}}>
                            <Typography type="display1">
                                Describe your teammate
                            </Typography>
                            <TextField
                                label="First name"
                                value={teammate.firstName}
                                onChange={(event) => this.updateObj("firstName", event.target.value)}
                                inputProps={NamesInputStyles}
                                style={nameStyle}
                            /><br/>
                            <TextField
                                label="Last name"
                                value={teammate.lastName}
                                onChange={(event) => this.updateObj("lastName", event.target.value)}
                                inputProps={NamesInputStyles}
                                style={nameStyle}
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
                                value={teammate.description}
                                multiline
                                rows={3}
                                fullWidth
                                onChange={(event) => this.updateObj("description", event.target.value)}
                                style={textFieldMargin}
                            /><br/>
                            <TeammateLocationEditor
                                university={teammate.university}
                                year={teammate.year}
                                city={teammate.city}
                                onChange={this.updateObj}
                            />
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Button style={{margin: "10px 0px"}} onClick={this.onSubmit}>
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                    <div>
                        {
                            this.state.similarPreviews.length > 0 &&
                            <Typography type="display1">Similar postings:</Typography>
                        }
                        {this.state.similarPreviews.map(
                            (preview, index) => <RatingPreviewCard preview={preview} key={index}/>)}
                    </div>
                </SplitVIewTemplate>
            </div>
        );
    }
}

interface DispatchToProps {
    createTeammate: (teammate: TeammateRecordDto) => void
}

const mapDispatchToProps = (dispatch): DispatchToProps => ({
    createTeammate: (teammate: TeammateRecordDto) => dispatch(RatingActions.createTeammateRecord(teammate))
});

interface StateToProps {

}

const mapStateToProps = (dispatch): StateToProps => ({});

export const CreateTeammateView = connect<any, DispatchToProps, any>(
    undefined,
    mapDispatchToProps
)(CreateTeammateViewComponent);