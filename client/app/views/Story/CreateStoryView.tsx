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


interface state {
    story: Story;
    showFileUploadDialog: boolean;
    filesUploaded: any[];
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

    updateStoryField = (key: string, value: any) => {
        let story = {...this.state.story};
        story[key] = value;
        this.setState({story});
    };

    insert = () => {
        this.setState({showFileUploadDialog: true});
    };

    onFileUploadSelect = (filesSelected, filesUploaded) => {
        let imageSrcs = filesSelected.map((f) => {
            return f.fileURL;
        });
        let newEditorState = EditorStateUtil.insertImages(this.state.story.content, imageSrcs);
        let newStory = {...this.state.story};
        newStory.content = newEditorState;
        this.setState({showFileUploadDialog: false, story: newStory, filesUploaded: filesUploaded});
    };

    onFileUploadCancel = (files) => {
        this.setState({showFileUploadDialog: false, filesUploaded: files});
    };

    submit = () => {
          StoryApiController.createStory(this.state.story).then(() => {
              this.props.history.push(Routes.story);
          }).catch((err) => {

              console.error(err)
          })
    };

    render() {
        const inputContainer = {paddingLeft: 20, paddingRight: 20};
        const input = {width: "100%"};
        return (
            <div>
                <Grid container justify="center">
                    <Grid item xs={12}>
                        <Grid container style={inputContainer}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Title"
                                    type="text"
                                    value={this.state.story.title}
                                    onChange={(event) => this.updateStoryField('title', event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TagsSelector selectedTags={this.state.story.tags}
                                              onChange={(tags) => this.updateStoryField('tags', tags)}/>
                            </Grid>
                            <Grid item xs={12}>
                                <DropDownSelect
                                    placeholder="Publicity Status"
                                    data={getDropDownDataFromStringEnum(PublicityStatus)}
                                    onChange={(p) => this.updateStoryField('publicityStatus', p)}
                                    value={this.state.story.publicityStatus}
                                />
                                <DropDownSelect
                                    placeholder="Category"
                                    data={getDropDownDataFromStringEnum(CategoryTypeEnum)}
                                    onChange={(cat) => this.updateStoryField('category', cat)}
                                    value={this.state.story.category}
                                />
                            </Grid>

                            <Button raised onClick={this.insert}>
                                Insert
                            </Button>
                            {this.state.showFileUploadDialog &&
                            <FileUploader initialFiles={this.state.filesUploaded}
                                          onSelect={this.onFileUploadSelect}
                                          onCancel={this.onFileUploadCancel}/>
                            }


                            <Grid item xs={12} md={12}>
                                <Typography type="caption" gutterBottom>Content :</Typography>
                                <CustomEditor value={this.state.story.content}
                                              onChange={(c) => this.updateStoryField('content', c)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justify="flex-end" style={inputContainer}>
                            <Grid item>
                                <Button raised label="Make Post" onClick={this.submit}>
                                    Make Post
                                </Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </div>
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