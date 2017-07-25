import * as React from "react";
import {MenuItem} from "material-ui/Menu";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import {connect} from "react-redux";
import {QuestionActions} from "../../actions/QuestionActions";
import {LoginRequiredComponent} from "../../components/LoginRequiredComponent";
import {PublicityStatus} from "../../../../server/enums/PublicityStatus";
import {QuestionDifficulty} from "../../../../server/models/Question";
import {AppStoreState} from "../../stores/AppStore";
import {QuestionCreationDto} from "../../../../server/dtos/q&a/QuestionCreationDto";
import {DifficultyLevel, QuestionEducationLevel} from "../../../../server/enums/QuestionEducationLevel";
import AnimatedWrapper from "../../components/AnimatedWrapper";
import {CustomEditor} from "../../components/CustomEditor/CustomEditor";
import {EditorState} from "draft-js";
import {FrontEndQuestionModels} from "../../models/QuestionModels";
import Grid from "material-ui/Grid";
import {createStyleSheet, withStyles} from "material-ui/styles";
import {TagsSelector} from "../../components/TagsComponent/TagsComponent";
import Typography from "material-ui/Typography";
import {DropDownSelect} from "../../components/DropDownSelect";
import {getDropDownDataFromNumericalEnum, getDropDownDataFromStringEnum} from "../../utils/utils";
import Question = FrontEndQuestionModels.Question;
import {QuestionDifficultyMenu} from "./subcomponents/QuestionDifficultyMenu";
import {Component} from "react";
import {RouterProps} from "react-router";
import {Routes} from "../../constants/Routes";


export interface CreateQuestionState {
    title: string;
    tags: string[]
    isPublished: boolean;
    content: string;
    publicityStatus: PublicityStatus;
    difficulty: QuestionDifficulty;
}

interface props extends stateToProps, dispatchToProps, RouterProps{}

class CreateQuestion extends Component<props, Question> {
    constructor(props) {
        super(props);
        this.state = {...new Question()};
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
        this.props.createQuestion(postReq);
        //
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
                <QuestionDifficultyMenu difficulty={this.state.difficulty} onDifficultyChange={this.onDifficultyChange}/>
            </Grid>
        )
    };

    render() {
        const inputContainer = {paddingLeft: 20, paddingRight: 20};
        const input= {width: "100%"};
        return (
            <Grid container justify="center" gutter={0}>
                <Grid item xs={12}>
                    <Grid container style={inputContainer} gutter={0}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                style={input}
                                label="Title"
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
                        </Grid>

                        {this.difficultyMenu()}

                        <Grid item xs={12} md={12}>
                            <Typography type="caption" gutterBottom>Content :</Typography>
                            <CustomEditor value={this.state.content}
                                          onChange={this.contentChange}
                                          height={350}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-end" style={inputContainer} gutter={0}>
                        <Grid item>
                            <Button raised label="Make Post" onClick={this.submit}>
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

export const CreateQuestionPage = AnimatedWrapper((connect(
    (state: AppStoreState) => ({loggedIn: state.auth.loggedIn}),
    (dispatch) => ({
        createQuestion: (question: Question) => dispatch(QuestionActions.createQuestion(question))
    })
)(CreateQuestion)));