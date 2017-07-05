import * as React from "react";
import {Component} from "react";
import {FrontEndQuestionModels} from "../../../models/QuestionModels";
import Divider from "material-ui/Divider";
import {QAEditorComponent} from "./Q&AEditorComponent";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;
import Question = FrontEndQuestionModels.Question;
import Answer = FrontEndQuestionModels.Answer;

export interface AnswerBoxComponentProps {
    onAnswerChange: (answer: Answer) => void;
    onSubmit: () => void;
    onEditClick: () => void;
    user: UserDto;
    answer: Answer;
    editMode: boolean;
    resetAnswer?: () => void;
}

const paperStyle = {height: "100%", padding: 15, paddingBottom: 0};

export class AnswerBoxComponent extends Component<AnswerBoxComponentProps> {

    onContentChange = (editorState) => {
        let question = this.props.answer;
        question.content = editorState;
        this.props.onAnswerChange(question);
    };

    render() {
        const answer = {...this.props.answer};
        const editable = (this.props.user && this.props.user.username === answer.author.username);
        return (
            <Paper style={paperStyle}>
                <div>
                    <Grid container justify="flex-end">
                        <Grid item>
                            {editable && !this.props.editMode && <Button onClick={this.props.onEditClick}>Edit</Button>}
                        </Grid>
                    </Grid>
                    <QAEditorComponent value={this.props.answer.content} onChange={this.onContentChange}
                                       onSubmit={this.props.onSubmit} readOnly={!this.props.editMode}
                                       style={{fontSize: 14}} reset={this.props.resetAnswer}
                    />
                    <Divider/>
                    <p style={{color: "grey", fontSize: 10, textAlign: "right"}}>
                        {answer.createdUtc && <div>Posted on {answer.createdUtc}</div>}
                        <br/>by {answer.author.username}
                    </p>
                </div>
            </Paper>
        )
    }
}