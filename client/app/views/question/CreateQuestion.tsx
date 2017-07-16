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

const styleSheet = createStyleSheet('CreateQuestion', theme => ({
    root: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    input: {
        width: "100%",
    },
    inputContainer: {paddingLeft: 20, paddingRight: 20},

}));

export interface CreateQuestionState {
    title: string;
    tags: string[]
    isPublished: boolean;
    content: string;
    publicityStatus: PublicityStatus;
    difficulty: QuestionDifficulty;
}

class CreateQuestion extends LoginRequiredComponent<any, QuestionCreationDto> {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            tags: [],
            isPublished: false,
            content: EditorState.createEmpty(),
            publicityStatus: PublicityStatus.PUBLIC,
            difficulty: {
                educationLevel: QuestionEducationLevel.NOT_SPECIFIED,
                difficultyLevel: DifficultyLevel.NOT_SPECIFIED
            }
        }
    }

    reset = () => {
        this.setState({title: '', content: '', tags: []})
    };

    titleChange = (event: any) => {
        this.setState({title: event.target.value});
    };

    contentChange = (value: EditorState) => {
        this.setState({content: value});
    };

    submit = () => {
        let postReq: QuestionCreationDto = this.state;
        this.props.createQuestion(postReq);
        //
    };

    selectFieldChange = (event: any, index: number, value: any[]) => {
        this.setState({tags: value});
    };

    menuItems = () => {
        return this.props.tags.map((tag: any) => (
            <MenuItem
                key={tag.name}
                value={tag}
                primaryText={tag.folderName}
            />
        ));
    };

    updateTags = (tags: string[]) => {
        this.setState({tags: tags});
    };

    onDifficultyChange = (difficulty: QuestionDifficulty) => {
        this.setState({difficulty});
    }

    difficultyMenu = () => {
        return (
            <Grid item xs={12}>
                <DropDownSelect
                    placeholder="Question Level"
                    data={getDropDownDataFromStringEnum(QuestionEducationLevel)}
                    onChange={(educationLevel) => this.onDifficultyChange({
                        educationLevel, difficultyLevel: this.state.difficulty.difficultyLevel
                    })}
                    defaultValue={QuestionEducationLevel.NOT_SPECIFIED}
                />
                { this.state.difficulty.educationLevel != QuestionEducationLevel.NOT_SPECIFIED &&
                <DropDownSelect
                    placeholder="Difficulty Level"
                    data={getDropDownDataFromNumericalEnum(DifficultyLevel)}
                    onChange={(difficultyLevel) => this.onDifficultyChange({
                        educationLevel: this.state.difficulty.educationLevel, difficultyLevel
                    })}
                    defaultValue={DifficultyLevel.NOT_SPECIFIED}
                />}
            </Grid>
        )
    }

    render() {
        const classes = this.props.classes;
        return (
            <Grid container justify="center" gutter={0}>
                <Grid item xs={12}>
                    <Grid container className={classes.inputContainer} gutter={0}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                className={classes.input}
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
                                defaultValue={PublicityStatus.PUBLIC}
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
                    <Grid container justify="flex-end" className={classes.inputContainer} gutter={0}>
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

export const CreateQuestionPage = AnimatedWrapper(withStyles(styleSheet)(connect(
    (state: AppStoreState) => ({loggedIn: state.auth.loggedIn}),
    (dispatch) => ({
        createQuestion: (question: Question) => dispatch(QuestionActions.createQuestion(question))
    })
)(CreateQuestion)));