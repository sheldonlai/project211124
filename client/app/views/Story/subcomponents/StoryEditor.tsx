import * as React from "react";
import {FrontEndStoryModels} from "../../../models/StoryModels";
import Story = FrontEndStoryModels.Story;
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import {DropDownSelect} from "../../../components/Forms/DropDownSelect";
import {TagsSelector} from "../../../components/TagsComponent/TagsComponent";
import {getDropDownDataFromStringEnum} from "../../../utils/utils";
import {PublicityStatus} from "../../../../../server/enums/PublicityStatus";
import {CategoryTypeEnum} from "../../../../../server/enums/CategoryTypeEnum";
import {FileUploader} from "../../../components/FileUpload/FileUploader";
import {CustomEditor} from "../../../components/CustomEditor/CustomEditor";
import {EditorStateUtil} from "../../../components/CustomEditor/EditorStateUtil";

interface props {
    story: Story
    onSubmit: (story: Story) => void;
    onCancel?: () => void
}
interface state extends Story {
    showFileUploadDialog: boolean;
    filesUploaded: any[];
}

export class StoryEditor extends React.Component<props, state>{
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.story,
            showFileUploadDialog: false,
            filesUploaded: []
        }
    }

    updateStoryField = (key: string, value: any) => {
        let updateObj = {};
        updateObj[key] = value;
        this.setState(updateObj);
    };

    insert = () => {
        this.setState({showFileUploadDialog: true});
    };

    onFileUploadSelect = (filesSelected, filesUploaded) => {
        let imageSrcs = filesSelected.map((f) => {
            return f.fileURL;
        });
        let content = EditorStateUtil.insertImages(this.state.content, imageSrcs);
        this.setState({showFileUploadDialog: false, content, filesUploaded: filesUploaded});
    };

    onFileUploadCancel = (files) => {
        this.setState({showFileUploadDialog: false, filesUploaded: files});
    };

    submit = () => {
        let story = {...this.state};
        delete story.filesUploaded;
        delete story.showFileUploadDialog;
        this.props.onSubmit(story as Story);
    };



    render(){
        return (
            <div>
                <Grid container justify="center">
                    <Grid item xs={12}>
                        <Grid container style={{}}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Title"
                                    type="text"
                                    value={this.state.title}
                                    onChange={(event) => this.updateStoryField('title', event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TagsSelector selectedTags={this.state.tags}
                                              onChange={(tags) => this.updateStoryField('tags', tags)}/>
                            </Grid>
                            <Grid item xs={12}>
                                <DropDownSelect
                                    placeholder="Publicity Status"
                                    data={getDropDownDataFromStringEnum(PublicityStatus)}
                                    onChange={(p) => this.updateStoryField('publicityStatus', p)}
                                    value={this.state.publicityStatus}
                                />
                                <DropDownSelect
                                    placeholder="Category"
                                    data={getDropDownDataFromStringEnum(CategoryTypeEnum)}
                                    onChange={(cat) => this.updateStoryField('category', cat)}
                                    value={this.state.category}
                                />
                            </Grid>
                            {this.state.showFileUploadDialog &&
                            <FileUploader initialFiles={this.state.filesUploaded}
                                          onSelect={this.onFileUploadSelect}
                                          onCancel={this.onFileUploadCancel}/>
                            }


                            <Grid item xs={12} md={12}>
                                <Typography type="caption" gutterBottom>Content :</Typography>
                                <CustomEditor value={this.state.content}
                                              style={{minHeight: 200}}
                                              onChange={(c) => this.updateStoryField('content', c)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justify="flex-end" style={{}}>
                            <Grid item>
                                <Button raised onClick={this.submit}>
                                    Save
                                </Button>
                                {
                                    this.props.onCancel &&
                                        <Button onClick={this.props.onCancel}>
                                            cancel
                                        </Button>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }

}