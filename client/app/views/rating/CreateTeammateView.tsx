
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
import {LoadingScreen} from "../../components/Animations/LoadingScreen";
import {RouterController} from "../../api.controllers/RouterController";
import {Routes} from "../../constants/Routes";
import {CustomLink} from "../../components/RoutingComponents/CustomLink";
import {UniversityYearEnum} from "../../../../server/enums/UniversityYearEnum";

interface state {
    teammateObj: TeammateRecordDto;
    showDesHint: boolean;
    similarPreviews: TeammatePreviewDto[];
    lastSearched: number;
    loading: boolean
    error: string;
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
            year: UniversityYearEnum.NOT_SPECIFIED,
            ratings: []
        };
        this.state = {
            teammateObj: obj,
            error: "",
            showDesHint: false,
            similarPreviews: [],
            lastSearched: 0,
            loading: false
        };
        this.apiController = RatingApiController.getInstance();
    }

    searchForSimilarTeammate = (teammateRecordDto: TeammateRecordDto) => {
        this.setState({lastSearched: Date.now(), loading: true});
        this.apiController.searchForTeammate(teammateRecordDto).then((res) => {
            this.setState({similarPreviews: res.data, loading: false});
        }).catch((err) => {
            console.error(err)
        });
    };

    createTeammate = () => {
        this.apiController.createTeammateRecord(this.state.teammateObj).then((res) => {
            RouterController.history.push(Routes.rating.replace(":id", res.data._id));
        }).catch((err) => {
            console.log(err);
            this.setState({error: err.response.data.error});
        });
    }

    updateObj = (key, value) => {
        let obj = {...this.state.teammateObj};
        if (typeof  value === "string" && key !== "description")
            value = value.toLocaleLowerCase();
        obj[key] = value;
        this.setState({teammateObj: obj},  () => {
            if (typeof  value !== "string")
                if (Date.now() - this.state.lastSearched > 100) // debounce of 600ms
                    this.searchForSimilarTeammate(this.state.teammateObj);
        });
    };

    onSubmit = () => {
        this.createTeammate();
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

                            <Typography style={{color: "red"}} color="inherit" type="body1">
                                {this.state.error}
                            </Typography>
                            <TextField
                                label="First name"
                                value={teammate.firstName}
                                onChange={(event) =>
                                    this.updateObj("firstName", (event.target as HTMLInputElement).value)}
                                onBlur={() => this.searchForSimilarTeammate(this.state.teammateObj)}
                                inputProps={NamesInputStyles}
                                style={nameStyle}
                            /><br/>
                            <TextField
                                label="Last name"
                                value={teammate.lastName}
                                onChange={(event) =>
                                    this.updateObj("lastName", (event.target as HTMLInputElement).value)}
                                onBlur={() => this.searchForSimilarTeammate(this.state.teammateObj)}
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
                                onChange={(event) =>
                                    this.updateObj("description", (event.target as HTMLInputElement).value)}
                                style={textFieldMargin}
                            /><br/>
                            <TeammateLocationEditor
                                university={teammate.university}
                                year={teammate.year}
                                city={teammate.city}
                                onChange={this.updateObj}
                            />
                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <CustomLink to={Routes.people}>
                                        <Button style={{margin: "10px 0px"}}>
                                            Cancel
                                        </Button>
                                    </CustomLink>
                                </Grid>
                                <Grid item xs={6}></Grid>
                                <Grid item xs>
                                    <Button style={{margin: "10px 0px"}} onClick={this.onSubmit}>
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                    <div>
                        {this.state.loading?
                            <LoadingScreen/>:
                            <div>
                                {
                                    this.state.similarPreviews.length > 0 &&
                                    <Typography type="headline">Similar postings:</Typography>
                                }
                                {this.state.similarPreviews.map(
                                    (preview, index) => <RatingPreviewCard preview={preview} key={index}/>)}
                            </div>
                        }

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