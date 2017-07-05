import * as React from "react";
import {Component} from "react";
import {FrontEndQuestionModels} from "../../../models/QuestionModels";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import Button from "material-ui/Button";
import {AnswerBoxComponent} from "./AnswerBoxComponent";
import AddIcon from "material-ui-icons/Add";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;
import Question = FrontEndQuestionModels.Question;
import Answer = FrontEndQuestionModels.Answer;
export interface AnswerBoxesComponentProps {
    onAnswersChange: (answers: Answer[]) => void;
    onSubmit: (answer: Answer) => void;
    user: UserDto;
    question: Question;
    answers: Answer[];
    resetAnswers?: ()=> void;
}

export interface AnswerBoxesComponentState {
    answerId: string;
    editAnswer: boolean;
}

export class AnswerBoxesComponent extends Component<AnswerBoxesComponentProps, AnswerBoxesComponentState> {
    state = {answerId: undefined, editAnswer: false};

    onEditClick = (answer: Answer) => {
        this.setState({answerId: answer._id, editAnswer: true})
    };

    onAnswerChange = (answer: Answer) => {
        let answers = this.props.answers;
        answers = answers.map((ans) => {
            if (answer._id === ans._id) {
                return answer;
            }
            return ans
        });
        this.props.onAnswersChange(answers);
    };

    addAnswer = () => {
        let answers = this.props.answers;
        let answer = new Answer(this.props.question._id, this.props.user);
        answers.push(answer);
        this.setState({answerId: answer._id, editAnswer: true});
        this.props.onAnswersChange(answers);
    };

    resetAnswers = () => {
        this.setState({editAnswer: false, answerId: undefined});
        this.props.resetAnswers();
    };

    render() {
        return (
            <div>
                {this.props.answers.map((answer) => {
                    let key = (answer._id) ? answer._id : "new question key";
                    const editMode = this.state.editAnswer && (answer._id === this.state.answerId || answer._id === undefined);
                    return (
                        <AnswerBoxComponent editMode={editMode}
                                            user={this.props.user} onSubmit={()=> {this.props.onSubmit(answer)}}
                                            answer={answer} onAnswerChange={this.onAnswerChange} key={key}
                                            onEditClick={()=> {this.onEditClick(answer)}}
                                            resetAnswer={this.resetAnswers}
                        />
                    )
                })}
                {(this.props.user && !this.state.editAnswer) &&
                <div key="edit-answer-button" style={{float: 'right', marginTop: 5}}>
                    <Button fab color="primary" onClick={this.addAnswer}>
                        <AddIcon/>
                    </Button>
                </div>}

            </div>
        )
    }
}