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
import {StoryEditor} from "./subcomponents/StoryEditor";
import {FrontEndStoryModels} from "../../models/StoryModels";
import Story = FrontEndStoryModels.Story;
import Grid from "material-ui/Grid";
import {SharedCommentsComponent} from "../../components/Comments/SharedCommentsComponent";
import {CommentDto} from "../../../../server/dtos/q&a/CommentDto";
export class StoryPage extends React.Component<props, { edit: boolean }> {
    constructor(props) {
        super(props);
        this.state = {edit: false}
    }

    componentWillMount() {
        let id = this.props.match.params.id;
        this.props.fetchStoryPage(id);
    }

    componentWillReceiveProps(nextProps: props){
       if (this.props.story&&
           JSON.stringify(this.props.story) !== JSON.stringify(nextProps.story)){
           this.setState({edit: false});
       }
    }

    editButton() {
        if (!this.props.user || this.state.edit)
            return undefined;
        return (
            <Grid container justify="flex-end">
                <Grid item>
                    <Button onClick={() => this.setState({edit: true})}>
                        Edit
                    </Button>
                </Grid>
            </Grid>
        )
    }

    view() {
        let paperStyle: CSSProperties = {};
        const story = this.props.story;
        return (
            <SplitVIewTemplate>
                <Paper style={paperStyle} elevation={0}>
                    {this.editButton()}
                    <Typography type="display1">{this.props.story.title}</Typography>
                    <Typography type="caption" style={{flex: "flex-end"}}>by {this.props.story.author.username}</Typography>
                    {this.editButton}
                    <Divider/>
                    <div>
                        <CustomEditor value={this.props.story.content} readOnly={true} border={false}/>
                        <div/>
                    </div>
                    <SharedCommentsComponent comments={this.props.story.comments}
                                       user={this.props.user}
                                       onCommentCreate={(comment) => this.props.createComment(comment, story._id)}
                                       onCommentUpdate={(comment) => this.props.updateComment(comment, story._id)}
                    />
                </Paper>
                <div>
                    <Typography type="headline">Tags</Typography>
                    <ChipListComponent chips={this.props.story.tags} keyName={"tag"}/>
                </div>
            </SplitVIewTemplate>

        )
    }

    editor() {
        let story: Story = {...this.props.story};
        story.tags = story.tags.map((tag)=> tag.tag);
        return (
            <SplitVIewTemplate>
                <StoryEditor story={story} onSubmit={this.props.updateStory} onCancel={this.onCancel}/>
                <div/>
            </SplitVIewTemplate>
        )
    }

    onCancel = () => {
        this.setState({edit: false});
    }

    mainView = () => {
        return this.state.edit ? this.editor() : this.view()
    };

    render() {
        return (
            <div style={{margin: 20}}>
                {
                    this.props.status === ReducerStateStatus.LOADING ?
                        <LoadingScreen/> :
                        this.mainView()
                }
            </div>
        )
    }
}

interface StateToProps extends StoryPageReducerState {
    user: UserDto;
}

interface DispatchToProps {
    fetchStoryPage: (id: string) => void;
    updateStory: (story: Story) => void;
    createComment: (comment:CommentDto, storyId: string) => void;
    updateComment: (comment:CommentDto, storyId: string) => void;
}

interface props extends StateToProps, DispatchToProps, RouteComponentProps<{ id: string }> {

}

const mapStateToProps = (state: AppStoreState): StateToProps => ({
    user: state.auth.user,
    ...state.storyPage
});

const mapDispatchToProps = (dispatch): DispatchToProps => ({
    fetchStoryPage: (id: string) => dispatch(StoryActions.fetchStoryPage(id)),
    updateStory: (story: Story) => dispatch(StoryActions.updateStory(story)),
    createComment: (comment:CommentDto, storyId: string) => dispatch(StoryActions.createComment(comment, storyId)),
    updateComment: (comment:CommentDto, storyId: string) => dispatch(StoryActions.updateComment(comment, storyId)),
});

export const StoryPageView = connect<StateToProps, DispatchToProps, RouteComponentProps<{ id: string }>>(
    mapStateToProps,
    mapDispatchToProps
)(StoryPage);

