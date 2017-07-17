import * as React from "react";
import {Component} from "react";
import {FrontEndQuestionModels} from "../../../models/QuestionModels";
import {EditableMultiPurposeHeader} from "../../../components/Headers/EditableMultiPurposeHeader";
import {ChipListComponent} from "../../../components/ChipListComponent";
import Divider from "material-ui/Divider";
import {QAEditorComponent} from "./Q&AEditorComponent";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import Icon from 'material-ui/Icon';
import Paper from "material-ui/Paper";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;
import Question = FrontEndQuestionModels.Question;
import cloneQuestion = FrontEndQuestionModels.cloneQuestion;
import {CommentsComponent} from "./CommentsComponent";
import cloneAnswer = FrontEndQuestionModels.cloneAnswer;
import {AppStoreState} from "../../../stores/AppStore";
import {QuestionActions} from "../../../actions/QuestionActions";
import {connect} from "react-redux";
import {Prompt} from "react-router";
import {FooterComponent} from "./FooterComponent";

interface QuestionBoxComponentProps {
    user: UserDto;
    question: Question;
}
interface state {
    question: Question;
    editMode: boolean;

}
interface props extends QuestionBoxComponentProps, DispatchProps {
}

let paperStyle = {height: "100%"};

export class QuestionBoxComponent extends Component<props, state> {

    state = {
        question: undefined,
        editMode: false
    }

    componentWillMount() {
        if (this.state.question === undefined)
            this.setState({
                question: this.props.question
            });
    }

    componentWillUnmount() {
        this.resetQuestion();
    }

    componentWillReceiveProps(nextProps: props) {
        if (JSON.stringify(nextProps.question) !== JSON.stringify(this.props.question)) {
            let question = cloneQuestion(nextProps.question);
            let editMode = false;
            if (this.state.question && JSON.stringify(question) != JSON.stringify(this.state.question)) {
                question.title = this.state.question.title;
                question.content = this.state.question.content;
                editMode = this.state.editMode;
            }
            this.setState({editMode, question});
        }
    }

    onTitleChange = (event) => {
        let question = cloneQuestion(this.state.question);
        question.title = event.target.value;
        this.setState({question});
    };

    onContentChange = (editorState) => {
        let question = cloneQuestion(this.state.question);
        question.content = editorState;
        this.setState({question});
    };

    onEditClick = () => {
        this.setState({editMode: true});
    }

    onCommentSubmit = (comments) => {
        let question = cloneQuestion(this.props.question);
        question.comments = comments;
        this.setState({question}, () => {
            this.onSubmit();
        });
    }

    resetQuestion = () => {
        let question = cloneQuestion(this.props.question);
        this.setState({editMode: false, question});
    }

    upVote = () => {
        this.props.upVoteQuestion(this.props.question);
    }

    downVote = () => {
        this.props.downVoteQuestion(this.props.question);
    }

    onSubmit = () => {
        this.props.editQuestion(this.state.question);
    };

    render() {
        const question: Question = {...this.state.question};
        const editable = this.props.user && (this.props.user.username === question.author.username);
        let editButton;
        if (editable && !this.state.editMode) {
            editButton = (
                <div style={{float: "right"}}>
                    <Button color="primary" onClick={this.onEditClick}>Edit</Button>
                </div>
            )
        }
        return (
            <div>
                <Prompt
                    when={this.state.editMode}
                    message={location => (
                        `All unsaved changes will be discarded. Are you sure you want to leave?`
                    )}
                />
                <Paper style={paperStyle}  elevation={0}>
                    <EditableMultiPurposeHeader value={question.title} editMode={this.state.editMode}
                                                onEditClick={this.onEditClick}
                                                onTitleChange={this.onTitleChange}/>
                    {editButton}
                    <Divider />
                    <div>
                        <QAEditorComponent value={question.content} onChange={this.onContentChange}
                                           onSubmit={this.onSubmit} readOnly={!this.state.editMode}
                                           style={{fontSize: 14}} reset={this.resetQuestion}
                        />
                        <div>
                            <ChipListComponent chips={question.tags} keyName={"tag"}/>
                        </div>
                        <Divider/>
                        <FooterComponent
                            onUpVote={this.upVote}
                            onDownVote={this.downVote}
                            upVotes={question.upVotes}
                            downVotes={question.downVotes}
                            author={question.author}
                            createdUtc={question.createdUtc}
                        />
                    </div>
                </Paper>
                <CommentsComponent comments={this.props.question.comments}
                                   user={this.props.user}
                                   onCommentsSubmit={this.onCommentSubmit}

                />
            </div>
        )
    }
}

const mapStateToProps = (state: AppStoreState) => ({
    user: state.auth.user,
    question: state.questionPage.questionPage.question
})
const mapDispatchToProps = (dispatch): DispatchProps => ({
    upVoteQuestion: (question: Question) => dispatch(QuestionActions.upVoteQuestion(question)),
    downVoteQuestion: (question: Question) => dispatch(QuestionActions.downVoteQuestion(question)),
    editQuestion: (question: Question) => dispatch(QuestionActions.updateQuestion(question)),
});

interface DispatchProps {
    upVoteQuestion: (question: Question) => void;
    downVoteQuestion: (question: Question) => void;
    editQuestion: (question: Question) => void;
}

export const QuestionBoxView = connect<QuestionBoxComponentProps, DispatchProps, any>(
    mapStateToProps, mapDispatchToProps)(QuestionBoxComponent);