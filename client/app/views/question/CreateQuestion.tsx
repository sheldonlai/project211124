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
import Question = FrontEndQuestionModels.Question;

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
        this.setState({title: '', content: ''})
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

    folderMenu = () => {
        if (this.props.tags != undefined) {
            // return (
            //     {/*<SelectField*/}
            //         {/*multiple={true}*/}
            //         {/*hintText="Select Folders"*/}
            //         {/*value={this.state.tags}*/}
            //         {/*onChange={this.selectFieldChange}*/}
            //         {/*fullWidth={true}>*/}
            //         {/*{this.menuItems()}*/}
            //     {/*</SelectField>*/}
            // )

        }
    };

    render() {
        let folderMenu;


        return (
            <div style={{textAlign: 'center'}}>
                <TextField
                    label="Title"
                    type="text"
                    value={this.state.title}
                    onChange={this.titleChange}
                />
                {/*<div>{folderMenu}</div>*/}
                <div style={{textAlign: "left", color : "#e3e3e3"}}>
                    <h4>Content :</h4>
                </div>
                <CustomEditor value={this.state.content}
                              onChange={this.contentChange} />
                <Button
                    raised
                    label="Make Post"
                    onClick={this.submit}
                >
                    Make Post
                </Button>
            </div>
        )
    }

}

export const CreateQuestionPage = AnimatedWrapper(connect(
    (state: AppStoreState) => ({loggedIn: state.auth.loggedIn}),
    (dispatch) => ({
        createQuestion: (question: Question) => dispatch(QuestionActions.createQuestion(question))
    })
)(CreateQuestion));