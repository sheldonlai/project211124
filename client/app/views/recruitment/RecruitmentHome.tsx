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
import {RatingPreviewCard} from "../rating/subcomponents/RatingPreviewCard";
import {TeammateRecordDto} from "../../../../server/dtos/rating/TeammateRecordDto";
import Input from "material-ui/Input/Input";
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton'
import Typography from "material-ui/Typography";
import TextField from 'material-ui/TextField';
import {TeammateAdvancedSearchEditor} from '../rating/subcomponents/TeammateAdvancedSearchEditor'
import {RatingApiController} from "../../api.controllers/RatingApiController";
import Tabs from "material-ui/Tabs/Tabs";
import Tab from "material-ui/Tabs/Tab";
import {RatingHomeView} from "../rating/RatingHomeView";

interface state {
    tab: number;
}

export class RecruitmentHomeComponent extends React.Component<StateToProps & DispatchToProps, state> {
    private apiController: RatingApiController;

    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
        };
        this.apiController = RatingApiController.getInstance();
    }


    render() {
        return (
            <div>
                <Tabs
                    value={this.state.tab}
                    onChange={(event, value) => this.setState({tab: value})}
                    indicatorColor="primary"
                    textColor="primary"
                    scrollable
                    scrollButtons="auto"
                >
                    <Tab label="Recruitment" />
                    <Tab label="People" />
                </Tabs>
                {this.state.tab === 0 && 'Item Two'}
                {this.state.tab === 1 && <RatingHomeView />}
                <br/>
                <CustomLink to={Routes.create_recruitment}>
                    <Button style={{margin: "10px 0px"}}>
                        RECRUIT TEAMMATE
                    </Button>
                </CustomLink>
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

export const RecruitmentHomeView = connect<StateToProps, DispatchToProps, any>(
    mapStateToProps,
    mapDispatchToProps
)(RecruitmentHomeComponent);