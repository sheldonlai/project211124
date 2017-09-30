import * as React from "react";
import {connect} from "react-redux";
import {StoryActions} from "../../actions/StoryActions";
import Button from "material-ui/Button";
import {CustomLink} from "../../components/RoutingComponents/CustomLink";
import {Routes} from "../../constants/Routes";
import {AppStoreState} from "../../stores/AppStore";
import {StoryHomeReducerState} from "../../reducers/StoryHomeReducer";
import {RouteComponentProps} from "react-router";
import {ReducerStateStatus} from "../../constants/ReducerStateStatus";
import {LoadingScreen} from "../../components/Animations/LoadingScreen";
import {PreviewCardsComponent} from "../../components/CardComponent/PreviewCardsComponent";
import Typography from "material-ui/Typography/Typography";
import Grid from "material-ui/Grid/Grid";
import {PRIMARY_COLOR} from "../router";
import {UserDto} from "../../../../server/dtos/auth/UserDto";

interface state {
    height: number;
    width: number;

}

export class StoryHomeComponent extends React.Component<props, state> {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchStories();
    }

    render() {
        return (
            <div>
                {this.props.status === ReducerStateStatus.LOADING ?
                    <LoadingScreen/> :
                    <div>

                        <PreviewCardsComponent label="Featured" list={this.props.previews} maxBlock={4}>
                            <Grid container justify="flex-end" direction="column" style={{width: "100%"}}>
                                <Grid item style={{paddding: 5}}>
                                    <Typography type="display1" style={{color: PRIMARY_COLOR}}>
                                        Story
                                    </Typography>
                                    <Typography type="body1" color="secondary" style={{textAlign: "left"}}>
                                        This module is build for story sharing, it could something about your favourite
                                        napping spot on campus or a project that you're working. This is a platform that
                                        allows you to share whatever you want.
                                    </Typography>
                                </Grid>
                                {
                                    this.props.user &&
                                    <Grid item>
                                        <CustomLink to={Routes.createStory}>
                                            <Button color="accent" style={{fontSize: 18}}>Write a
                                                Story</Button></CustomLink>
                                    </Grid>
                                }
                            </Grid>
                        </PreviewCardsComponent>
                        <PreviewCardsComponent label="My Stories" list={this.props.previews} maxBlock={4}/>

                    </div>
                }
            </div>
        );
    }
}

interface stateToProps extends StoryHomeReducerState {
    user: UserDto;
}

interface dispatchProps {
    fetchStories: () => void;
}

interface props extends stateToProps, dispatchProps, RouteComponentProps<void> {
}

const mapStateToProps = (state: AppStoreState) => ({
    ...state.storyHome,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
    fetchStories: () => dispatch(StoryActions.getStoryPreviews()),
});

export const StoryHome = connect<stateToProps, dispatchProps, RouteComponentProps<void>>(
    mapStateToProps, mapDispatchToProps)(StoryHomeComponent);