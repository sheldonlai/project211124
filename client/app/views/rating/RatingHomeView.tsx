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
import {TeammateRecordDto} from "../../../../server/dtos/rating/TeammateRecordDto";
import Input from "material-ui/Input/Input";
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton'
import Typography from "material-ui/Typography";
import TextField from 'material-ui/TextField';
import {AdvancedSearchEditor} from './subcomponents/AdvancedSearchEditor'

export class RatingHomeViewComponent extends React.Component<StateToProps & DispatchToProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            searchString: "",
            AdvancedSearch: false,
        };
    }

    componentWillMount() {
        this.props.fetchRatingPreviews();
    }

    recordRow = (preview: TeammatePreviewDto, index: number) => {
        return (<RatingPreviewCard preview={preview} key={index}/>);
    };

    onSearchStringChange = (event) => {
        this.setState({searchString: event.target.value});
    };

    renderSearchBar = () => {
        return(
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        label="Search..."
                        placeholder="Search..."
                        value = {this.state.searchString}
                        onChange = {this.onSearchStringChange}
                    />
                    <IconButton onClick={this.FindSimilarTeammates}>
                        <Icon>search</Icon>
                    </IconButton>
                    <Typography style={{cursor: "pointer"}} type="caption" align="justify" onClick={()=>this.setState({AdvancedSearch: !this.state.AdvancedSearch})}>
                        Advanced
                    </Typography>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item sm={8}>
                        {this.state.AdvancedSearch && <AdvancedSearchEditor/>}
                    </Grid>
                </Grid>
            </div>
        )
    }

    FindSimilarTeammates = () => {
        let splittedStrings: string[] = this.state.searchString.split(" ");
        this.props.BlurrySearch(splittedStrings);
    };

    mainContent = () => {
        if (this.props.ratingPreviews.length < 1) {
            return <Grid container justify="center">
                <Grid item xs={12} style={{textAlign: "center"}}>
                    <Typography type="headline">
                        There are currently no ratings available.
                    </Typography>
                </Grid>
                <Grid item style={{textAlign: "center"}}>
                    {
                        !this.props.loggedIn &&
                        <Typography type="body1" color="inherit" style={{color: "#aaa"}}>
                            Please log in to make a write about a teammate.
                        </Typography>
                    }
                </Grid>
            </Grid>
        } else {
            return this.props.ratingPreviews.map((e, i) => this.recordRow(e, i))
        }
    };

    render() {
        return (
            <div style={{padding: 10}}>
                {this.renderSearchBar()}
                <Grid container justify="center" direction="row-reverse">
                    <Grid item xs={12} md={3} lg={2}>
                    </Grid>
                    <Grid item xs={12} md={8} lg={6}>
                        <div>
                            {
                                this.props.loggedIn &&
                                <CustomLink to={Routes.create_teammate_record}>
                                    <Button color="primary">Create A Teammate Record</Button>
                                </CustomLink>
                            }
                            {
                                this.props.ratingPreviewStatus === ReducerStateStatus.LOADING ?
                                    <LoadingScreen/>:
                                    this.mainContent()

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
    BlurrySearch: (InputStrings: string[]) => void;
}

const mapDispatchToProps = (dispatch): DispatchToProps => ({
    fetchRatingPreviews: () => dispatch(RatingActions.getTeammateRecordPreview()),
    BlurrySearch: (InputStrings: string[]) => dispatch(RatingActions.BlurrySearch(InputStrings)),
});

interface StateToProps {
    ratingPreviewStatus: ReducerStateStatus;
    ratingPreviews: TeammatePreviewDto[];
    loggedIn: boolean;
}

const mapStateToProps = (state: AppStoreState): StateToProps => ({
    ratingPreviewStatus: state.ratingHome.status,
    ratingPreviews: state.ratingHome.previews,
    loggedIn: state.auth.loggedIn,
});

export const RatingHomeView = connect<StateToProps, DispatchToProps, any>(
    mapStateToProps,
    mapDispatchToProps
)(RatingHomeViewComponent);