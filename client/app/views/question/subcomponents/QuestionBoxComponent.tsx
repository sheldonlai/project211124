import * as React from "react";
import {Component} from "react";
import {FrontEndQuestionModels} from "../../../models/QuestionModels";
import {EditableMultiPurposeHeader} from "../../../components/Headers/EditableMultiPurposeHeader";
import {ChipListComponent} from "../../../components/ChipListComponent";
import Divider from "material-ui/Divider";
import {QAEditorComponent} from "./Q&AEditorComponent";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;
import Question = FrontEndQuestionModels.Question;
import cloneQuestion = FrontEndQuestionModels.cloneQuestion;

export interface QuestionBoxComponentProps {
    onQuestionChange: (question: Question) => void;
    onSubmit: () => void;
    onEditClick?: () => void;
    user: UserDto;
    question: Question;
    editMode: boolean;
    resetQuestion? : () => void ;
}

let paperStyle = {height: "100%", padding: 15, paddingBottom: 0};

export class QuestionBoxComponent extends Component<QuestionBoxComponentProps> {
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

    render() {
        const question = {...this.props.question};
        const editable = this.props.user.username === question.author.username;
        let editButton;
        if (editable && !this.props.editMode){
            editButton = (
                <div style={{float: "right"}}>
                    <Button color="primary" onClick={this.props.onEditClick}>Edit</Button>
                </div>
            )
        }
        return (
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
                    <p style={{color: "grey", fontSize: 10, textAlign: "right"}}>
                        Posted on {question.createdUtc}<br/>by {question.author.username}
                    </p>
                </div>
            </Paper>
        )
    }
}