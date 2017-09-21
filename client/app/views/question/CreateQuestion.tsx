import * as React from "react";
import {Component} from "react";
import {MenuItem} from "material-ui/Menu";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import {connect} from "react-redux";
import {QuestionActions} from "../../actions/QuestionActions";
import {PublicityStatus} from "../../../../server/enums/PublicityStatus";
import {QuestionDifficulty} from "../../../../server/models/Question";
import {AppStoreState} from "../../stores/AppStore";
import {CustomEditor} from "../../components/CustomEditor/CustomEditor";
import {EditorState} from "draft-js";
import {FrontEndQuestionModels} from "../../models/QuestionModels";
import Grid from "material-ui/Grid";
import {TagsSelector} from "../../components/TagsComponent/TagsComponent";
import Typography from "material-ui/Typography";
import {DropDownSelect} from "../../components/Forms/DropDownSelect";
import {getDropDownDataFromStringEnum} from "../../utils/utils";
import {QuestionDifficultyMenu} from "./subcomponents/QuestionDifficultyMenu";
import {RouterProps} from "react-router";
import {Routes} from "../../constants/Routes";
import {CategoryTypeEnum} from "../../../../server/enums/CategoryTypeEnum";
import Question = FrontEndQuestionModels.Question;
import {QuestionAPIController} from "../../api.controllers/QuestionAPIController";
import {SimpleUploader} from "../../components/FileUpload/SimpleUploader";
import {PreviewImageDisplay} from "../../components/Images/PreviewImageDisplay";
import {APIUrls} from "../../../../server/urls";


export interface CreateQuestionState extends Question{
    error: string;
}

interface props extends stateToProps, dispatchToProps, RouterProps{}

class CreateQuestion extends Component<props, CreateQuestionState> {

    apiController;
    constructor(props) {
        super(props);
        this.state = {...new Question(), error: ''};
        this.apiController = QuestionAPIController.getInstance();
    }

    componentWillMount(){
        if (!this.props.loggedIn) {
            this.props.history.push(Routes.home);
        }
    }

    reset = () => {
        this.setState({...new Question()})
    };

    titleChange = (event: any) => {
        this.setState({title: event.target.value});
    };

    contentChange = (value: EditorState) => {
        this.setState({content: value});
    };

    submit = () => {
        let postReq: Question = this.state;
        if (!postReq.title){
            this.setState({error: "Title cannot be empty"})
            return;
        }
        if (!postReq.content.getCurrentContent().hasText()){
            this.setState({error: "Content cannot be empty"})
            return;
        }
        this.props.createQuestion(postReq);
    };

    selectFieldChange = (event: any, index: number, value: any[]) => {
        this.setState({tags: value});
    };

    menuItems = () => {
        // return this.props.tags.map((tag: any) => (
        //     <MenuItem
        //         key={tag.name}
        //         value={tag}
        //         primaryText={tag.folderName}
        //     />
        // ));
    };

    updateTags = (tags: string[]) => {
        this.setState({tags: tags});
    };

    onDifficultyChange = (difficulty: QuestionDifficulty) => {
        this.setState({difficulty});
    };

    difficultyMenu = () => {
        return (
            <Grid item xs={12}>
                <QuestionDifficultyMenu difficulty={this.state.difficulty}
                                        onDifficultyChange={this.onDifficultyChange}/>
            </Grid>
        )
    };

    /* File Upload related methods */
    // insert = () => {
    //     this.setState({showFileUploadDialog: true});
    // };
    //
    // onFileUploadSelect = (filesSelected, filesUploaded) => {
    //     let imageSrcs = filesSelected.map((f) => { return f.fileURL; });
    //     let newEditorState = EditorStateUtil.insertImages(this.state.content, imageSrcs);
    //     this.setState({showFileUploadDialog: false, content: newEditorState, filesUploaded: filesUploaded});
    // };
    //
    // onFileUploadCancel = (files) => {
    //     this.setState({showFileUploadDialog: false, filesUploaded: files});
    // };

    render() {
        const inputContainer = {paddingLeft: 20, paddingRight: 20};
        const input= {width: "100%"};
        return (
            <Grid container justify="center" style={{paddingTop: 20}}>
                <Grid item xs={12}>
                    <Typography type="body1" style={{width: "100%", textAlign: 'center', color: "red", fontSize: 18}}>
                        {this.state.error}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container style={inputContainer}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={this.state.error.indexOf("Title") !== -1}
                                style={input}
                                label="Title"
                                required
                                type="text"
                                value={this.state.title}
                                onChange={this.titleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TagsSelector selectedTags={this.state.tags} onChange={this.updateTags}/>
                        </Grid>
                        <Grid item xs={12}>
                            <DropDownSelect
                                placeholder="Publicity Status"
                                data={getDropDownDataFromStringEnum(PublicityStatus)}
                                onChange={(publicityStatus) => this.setState({publicityStatus})}
                                value={this.state.publicityStatus}
                            />
                            <DropDownSelect
                                placeholder="Category"
                                data={getDropDownDataFromStringEnum(CategoryTypeEnum)}
                                onChange={(category) => this.setState({category})}
                                value={this.state.category}
                            />
                        </Grid>

                        {this.difficultyMenu()}
                        <SimpleUploader onFieldUploaded={(file) => this.setState({previewImage: file})}
                                        url={APIUrls.PreviewImageUpload}
                        />
                        {
                            this.state.previewImage &&
                                <PreviewImageDisplay file={this.state.previewImage}/>
                        }

                        <Grid item xs={12} md={12}>
                            <Typography type="caption" gutterBottom>Content :</Typography>
                            <CustomEditor value={this.state.content}
                                          onChange={this.contentChange}
                                          style={{minHeight: 200}}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-end" style={inputContainer}>
                        <Grid item>
                            <Button raised onClick={this.submit}>
                                Make Post
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        )
    }

}

interface stateToProps {
    loggedIn: boolean;
}

interface dispatchToProps {
    createQuestion : (question: Question) => void;
}

export const CreateQuestionPage = (connect(
    (state: AppStoreState) => ({loggedIn: state.auth.loggedIn}),
    (dispatch) => ({
        createQuestion: (question: Question) => dispatch(QuestionActions.createQuestion(question))
    })
)(CreateQuestion));