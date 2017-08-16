import * as React from "react";
import {connect} from "react-redux";
import {StoryPreviews} from "./subcomponents/StoryPreviews";
import {StoryActions} from "../../actions/StoryActions";
import Button from "material-ui/Button";
import {CustomLink} from "../../components/CustomLink";
import {Routes} from "../../constants/Routes";
import {AppStoreState} from "../../stores/AppStore";
import {StoryHomeReducerState} from "../../reducers/StoryHomeReducer";
import {RouteComponentProps, RouteProps} from "react-router";

interface state {
    height: number; width: number;

}

export class StoryHomeComponent extends React.Component<props, state> {

    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
    }

    componentWillMount(){
        this.props.fetchStories();
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight});
    };

    render() {
        //const loading = th
        return (
            <div>
                <CustomLink to={Routes.story}>
                    <Button>New Story</Button>
                </CustomLink>
                <StoryPreviews label="Featured" list={[]} />
            </div>
        );
    }
}

interface stateToProps extends StoryHomeReducerState{}

interface  dispatchProps {
    fetchStories: () => void;
}

interface props extends stateToProps, dispatchProps, RouteComponentProps<void>{}
const mapStateToProps = (state: AppStoreState) => ({
    ...state.storyHome
});

const mapDispatchToProps = (dispatch) => ({
    fetchStories: () => dispatch(StoryActions.getStoryPreviews()),
});

export const StoryHome = connect<stateToProps, dispatchProps, RouteComponentProps<void>>(
    mapStateToProps, mapDispatchToProps)(StoryHomeComponent);