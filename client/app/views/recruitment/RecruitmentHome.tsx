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
import {RecruitmentActions} from "../../actions/RecruitmentActions";
import {PreviewCardsComponent} from "../../components/CardComponent/PreviewCardsComponent";
import {FrontEndRecruitmentModels} from "../../models/RecruitmentModels";
import RecruitmentPreview = FrontEndRecruitmentModels.RecruitmentPreview;
import {PRIMARY_COLOR} from "../router";

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

    componentWillMount(){
        this.props.fetchRecruitmentPreviews();
    }

    render() {
        if(this.props.pageStatus == ReducerStateStatus.LOADING)
            return <LoadingScreen/>

        return (
            <div>
                <PreviewCardsComponent label="Featured" list={this.props.featuredRecruitments} maxBlock={4}>
                    <Grid container justify="flex-end" direction="column" style={{width: "100%"}}>
                        <Grid item style={{paddding: 5}}>
                            <Typography type="display1" style={{color: PRIMARY_COLOR}}>
                                Recruitment
                            </Typography>
                            <Typography type="body1" color="secondary" style={{textAlign: "left"}}>
                                This is the module for member recruitment. Here, you could look for teammates to join your course group,
                                or to find partners to work on a personal project together.
                            </Typography>
                        </Grid>
                        {
                            this.props.loggedIn &&
                            <Grid item>
                                <CustomLink to={Routes.create_recruitment}>
                                    <Button style={{margin: "10px 0px"}}>
                                        RECRUIT TEAMMATE
                                    </Button>
                                </CustomLink>
                            </Grid>
                        }
                    </Grid>
                </PreviewCardsComponent>
                <PreviewCardsComponent label="My Recruitments" list={this.props.myRecruitments} maxBlock={4}/>
            </div>
        )
    }
}

interface DispatchToProps {
    fetchRecruitmentPreviews: () => void;
}

const mapDispatchToProps = (dispatch): DispatchToProps => ({
    fetchRecruitmentPreviews: () => dispatch(RecruitmentActions.getRecruitmentPreviews()),
});

interface StateToProps {
    pageStatus: ReducerStateStatus;
    featuredRecruitments: RecruitmentPreview[],
    myRecruitments: RecruitmentPreview[],
    loggedIn: boolean;

}

const mapStateToProps = (state: AppStoreState): StateToProps => ({
    pageStatus: state.recruitmentHome.status,
    featuredRecruitments: state.recruitmentHome.featuredRecruitments,
    myRecruitments: state.recruitmentHome.myRecruitments,
    loggedIn: state.auth.loggedIn,
});

export const RecruitmentHomeView = connect<StateToProps, DispatchToProps, any>(
    mapStateToProps,
    mapDispatchToProps
)(RecruitmentHomeComponent);