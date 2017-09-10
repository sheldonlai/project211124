import * as React from "react";
import {connect} from "react-redux";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import {CustomLink} from "../../components/RoutingComponents/CustomLink";
import {Routes} from "../../constants/Routes";
import {RatingActions} from "../../actions/RatingActions";
import {AppStoreState} from "../../stores/AppStore";
import {TeammatePreviewDto} from "../../../../server/dtos/rating/TeammatePreviewDto";
import {CardActions, CardContent} from 'material-ui/Card';
import {ReducerStateStatus} from "../../constants/ReducerStateStatus";
import {LoadingScreen} from "../../components/Animations/LoadingScreen";
import {RatingPreviewCard} from "./subcomponents/RatingPreviewCard";
import {TeammateRecordDto} from "../../../../server/dtos/rating/TeammateRecordDto";
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton'
import Typography from "material-ui/Typography";
import TextField from 'material-ui/TextField';
import {AdvancedSearchEditor} from './subcomponents/AdvancedSearchEditor'
import {RatingApiController} from "../../api.controllers/RatingApiController";
import Input from "material-ui/Input/Input";
import {SearchBarComponent} from "../../components/SearchBar/SearchBarComponent";

export class RatingHomeViewComponent extends React.Component<StateToProps & DispatchToProps, any> {
    private apiController: RatingApiController;

    constructor(props) {
        super(props);
        this.state = {
            SearchTeammateObj: {
                _id: undefined,
                firstName: '',
                lastName: '',
                description: '',
                ratings: [],
                city: undefined,
                university: undefined,
                year: undefined,
            },
            searchString: "",
            AdvancedSearch: false,
            KeyTerms: [],
        };
        this.apiController = RatingApiController.getInstance();
    }

    PreciseTeammateSearch = (teammateRecordDto: TeammateRecordDto) => {
        this.setState({lastSearched: Date.now(), loading: true});
        this.props.AdvancedSearch(teammateRecordDto);
    };

    componentWillMount() {
        this.props.fetchRatingPreviews();
    }

    recordRow = (preview: TeammatePreviewDto, index: number) => {
        return (<RatingPreviewCard preview={preview} key={index} KeyTerms={this.state.KeyTerms}/>);
    };

    onSearchStringChange = (event) => {
        this.setState({searchString: event.target.value});
    };

    UpdateSearchTeammateObj = (obj) => {
        let Splitter: string[] = obj.description.split(" ");
        this.setState({SearchTeammateObj: obj, KeyTerms: Splitter});
    };

    renderSearchBar = () => {
        return (
            <div>
                <SearchBarComponent
                    value={this.state.SearchString}
                    onChange={this.onSearchStringChange}
                    onSearch={this.FindSimilarTeammates}
                    onAdvanceSearch={() => this.setState({AdvancedSearch: !this.state.AdvancedSearch})}
                />
                <Grid container spacing={24}>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item sm={8}>
                        {this.state.AdvancedSearch &&
                        <AdvancedSearchEditor SearchTeammateObj={this.state.SearchTeammateObj}
                                              UpdateSearchTeammateObj={this.UpdateSearchTeammateObj}/>}
                    </Grid>
                </Grid>
            </div>
        )
    }

    FindSimilarTeammates = () => {
        if (this.state.AdvancedSearch) {
            this.PreciseTeammateSearch(this.state.SearchTeammateObj);
        }
        else {
            let splittedStrings: string[] = this.state.searchString.split(" ");
            this.props.BlurrySearch(splittedStrings);
        }
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
                                    <LoadingScreen/> :
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
    AdvancedSearch: (TeammateObj: TeammateRecordDto) => void;
}

const mapDispatchToProps = (dispatch): DispatchToProps => ({
    fetchRatingPreviews: () => dispatch(RatingActions.getTeammateRecordPreview()),
    BlurrySearch: (InputStrings: string[]) => dispatch(RatingActions.BlurrySearch(InputStrings)),
    AdvancedSearch: (TeammateObj: TeammateRecordDto) => dispatch(RatingActions.AdvancedTeammateSearch(TeammateObj)),
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