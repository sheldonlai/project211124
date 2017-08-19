import * as React from "react";
import {StoryPageReducerState} from "../../reducers/StoryPageReducer";
import {AppStoreState} from "../../stores/AppStore";
import {StoryActions} from "../../actions/StoryActions";
import {RouteComponentProps, RouteProps} from "react-router";
import {connect} from "react-redux";
import Paper from "material-ui/Paper";
import {EditableMultiPurposeHeader} from "../../components/Headers/EditableMultiPurposeHeader";
import Divider from "material-ui/Divider";
import {QAEditorComponent} from "../question/subcomponents/Q&AEditorComponent";
import {SplitVIewTemplate} from "../../components/Templates/SplitVIewTemplate";
import {ChipListComponent} from "../../components/Forms/ChipListComponent";
import Button from "material-ui/Button";
import {UserDto} from "../../../../server/dtos/auth/UserDto";
import {CSSProperties} from "react";
import {CustomEditor} from "../../components/CustomEditor/CustomEditor";
import Typography from "material-ui/Typography";
import {ReducerStateStatus} from "../../constants/ReducerStateStatus";
import {LoadingScreen} from "../../components/Animations/LoadingScreen";

export class StoryPage extends React.Component<props> {

    componentWillMount(){
        let id = this.props.match.params.id;
        this.props.fetchStoryPage(id);
    }

    editButton() {
        if (this.props.user)
            return  undefined;
        return (
            <div>
                <Button>
                    Edit
                </Button>
            </div>
        )
    }

    view () {
        let paperStyle: CSSProperties = {};
        return (
            <SplitVIewTemplate>
                <Paper style={paperStyle} elevation={0}>
                    <Typography type="display1">{this.props.story.title}</Typography>
                    {this.editButton}
                    <Divider />
                    <div>
                        <CustomEditor value={this.props.story.content} readOnly={true} border={false}/>
                        <div>
                            <ChipListComponent chips={this.props.story.tags} keyName={"tag"}/>
                        </div>
                    </div>
                </Paper>
                <div>

                </div>
            </SplitVIewTemplate>

        )
    }

    render () {
        return (
            <div style={{margin: 20}}>
                {this.props.status === ReducerStateStatus.LOADING?
                    <LoadingScreen/>:
                    this.view()}
            </div>
        )
    }
}

interface StateToProps extends StoryPageReducerState{
    user: UserDto;
}

interface DispatchToProps {
    fetchStoryPage: (id: string) => void
}

interface props extends StateToProps, DispatchToProps, RouteComponentProps<{id: string}>{

}

const mapStateToProps = (state: AppStoreState): StateToProps => ({
    user: state.auth.user,
    ...state.storyPage
});

const mapDispatchToProps = (dispatch) => ({
    fetchStoryPage : (id: string) => dispatch(StoryActions.fetchStoryPage(id))
});

export const StoryPageView = connect<StateToProps, DispatchToProps, RouteComponentProps<{id: string}>>(
    mapStateToProps,
    mapDispatchToProps
)(StoryPage);

