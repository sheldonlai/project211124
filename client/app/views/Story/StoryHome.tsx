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
                            <div style={{width: "100%", textAlign: "right"}}>
                                <CustomLink to={Routes.createStory}>
                                    <Button>New Story</Button>
                                </CustomLink>
                            </div>
                        </PreviewCardsComponent>
                        <PreviewCardsComponent label="My Stories" list={this.props.previews} maxBlock={4}/>

                    </div>
                }
            </div>
        );
    }
}

interface stateToProps extends StoryHomeReducerState {
}

interface dispatchProps {
    fetchStories: () => void;
}

interface props extends stateToProps, dispatchProps, RouteComponentProps<void> {
}

const mapStateToProps = (state: AppStoreState) => ({
    ...state.storyHome
});

const mapDispatchToProps = (dispatch) => ({
    fetchStories: () => dispatch(StoryActions.getStoryPreviews()),
});

export const StoryHome = connect<stateToProps, dispatchProps, RouteComponentProps<void>>(
    mapStateToProps, mapDispatchToProps)(StoryHomeComponent);