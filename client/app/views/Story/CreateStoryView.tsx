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
import {CustomEditor} from "../../components/CustomEditor/CustomEditor";
import {FileUploader} from "../../components/FileUpload/FileUploader";
import Grid from "material-ui/Grid"
import TextField from "material-ui/TextField";
import {TagsSelector} from "../../components/TagsComponent/TagsComponent";
import {DropDownSelect} from "../../components/Forms/DropDownSelect";
import {getDropDownDataFromStringEnum} from "../../utils/utils";
import {CategoryTypeEnum} from "../../../../server/enums/CategoryTypeEnum";
import {StoryDto} from "../../../../server/dtos/story/StoryDto";
import {EditorState} from "draft-js";
import {FrontEndStoryModels} from "../../models/StoryModels";
import Story = FrontEndStoryModels.Story;
import Typography from "material-ui/Typography";
import {EditorStateUtil} from "../../components/CustomEditor/EditorStateUtil";
import {PublicityStatus} from "../../../../server/enums/PublicityStatus";
import {StoryApiController} from "../../api.controllers/StoryApiController";
import {StoryEditor} from "./subcomponents/StoryEditor";


interface state {
}

export class CreateStoryComponent extends React.Component<props, state> {

    constructor(props) {
        super(props);
        this.state = {
            story: new Story(),
            showFileUploadDialog: false,
            filesUploaded: []
        }
    }

    submit = (story) => {
          StoryApiController.createStory(story).then(() => {
              this.props.history.push(Routes.story);
          }).catch((err) => {
              console.error(err)
          })
    };

    render() {
        const inputContainer = {paddingLeft: 20, paddingRight: 20};
        const input = {width: "100%"};
        return (
            <StoryEditor story={new Story()} onSubmit={this.submit}/>
        );
    }
}

interface stateToProps {
}

interface dispatchProps {
}

interface props extends stateToProps, dispatchProps, RouteComponentProps<void> {
}

const mapStateToProps = (state: AppStoreState) => ({});

const mapDispatchToProps = (dispatch) => ({});

export const CreateStoryView = connect<stateToProps, dispatchProps, RouteComponentProps<void>>(
    mapStateToProps, mapDispatchToProps)(CreateStoryComponent);