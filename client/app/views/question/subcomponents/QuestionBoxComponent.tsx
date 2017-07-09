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

export interface QuestionBoxComponentProps {
    onQuestionChange: (question: Question) => void;
    onSubmit: () => void;
    onEditClick?: () => void;
    user: UserDto;
    question: Question;
    editMode: boolean;
    resetQuestion? : () => void ;
}
export interface futureState {
    question: Question;
    editMode: boolean;

}

let paperStyle = {height: "100%", padding: 15, paddingBottom: 0};

export class QuestionBoxComponent extends Component<QuestionBoxComponentProps, any> {
    onTitleChange = (event) => {
        let question = cloneQuestion(this.props.question);
        question.title = event.target.value;
        this.props.onQuestionChange(question);
    };

    onContentChange = (editorState) => {
        let question = cloneQuestion(this.props.question);
        question.content = editorState;
        this.props.onQuestionChange(question);
    };

    getComments = () => {
        return this.props.question.comments;
    }

    render() {
        const question = {...this.props.question};
        const editable = this.props.user && (this.props.user.username === question.author.username);
        let editButton;
        if (editable && !this.props.editMode) {
            editButton = (
                <div style={{float: "right"}}>
                    <Button color="primary" onClick={this.props.onEditClick}>Edit</Button>
                </div>
            )
        }
        return (
            <div>
                <Paper style={paperStyle}>
                    <EditableMultiPurposeHeader value={question.title} editMode={this.props.editMode}
                                                onEditClick={this.props.onEditClick}
                                                onTitleChange={this.onTitleChange}/>
                    {editButton}
                    <Divider />
                    <div>
                        <QAEditorComponent value={this.props.question.content} onChange={this.onContentChange}
                                           onSubmit={this.props.onSubmit} readOnly={!this.props.editMode}
                                           style={{fontSize: 14}} reset={this.props.resetQuestion}
                        />
                        <div>
                            <ChipListComponent chips={question.tags} keyName={"tag"}/>
                        </div>
                        <Divider/>
                        <div>
                        <span>
                            <IconButton>
                                <Icon >thumb_up</Icon>
                            </IconButton>
                            {question.upVotes}
                        </span>
                            <span>
                            <IconButton>
                                <Icon>thumb_down</Icon>
                            </IconButton>
                                {question.downVotes}
                        </span>
                            <span>
                            <p style={{color: "grey", fontSize: 10, textAlign: "right"}}>
                                Posted on {question.createdUtc}<br/>by {question.author.username}
                            </p>
                        </span>
                        </div>
                    </div>
                </Paper>
                <CommentsComponent comments = {this.getComments()}
                                   user={this.props.user}
                                   onCommentsSubmit={(comments)=> {
                                       let question = cloneQuestion(this.props.question);
                                       question.comments = comments;
                                       this.props.onQuestionChange(question);
                                       this.props.onSubmit();
                                   }}

                />
            </div>
        )
    }
}