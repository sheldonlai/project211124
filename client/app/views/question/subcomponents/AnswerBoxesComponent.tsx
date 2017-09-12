import * as React from "react";
import {Component} from "react";
import {FrontEndQuestionModels} from "../../../models/QuestionModels";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import {AnswerBoxComponent, AnswerBoxView} from "./AnswerBoxComponent";
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;
import Question = FrontEndQuestionModels.Question;
import Answer = FrontEndQuestionModels.Answer;
import cloneAnswers = FrontEndQuestionModels.cloneAnswers;
import {connect} from "react-redux";
import {AppStoreState} from "../../../stores/AppStore";
import {AnswerActions} from "../../../actions/AnswerActions";
import {QuestionPageReducerState} from "../../../reducers/QuestionPageReducer";
import cloneAnswer = FrontEndQuestionModels.cloneAnswer;
import {Prompt} from "react-router";
import {arrayFind, findIndex} from "../../../utils/ArrayUtils";
export interface AnswerBoxesComponentProps {
}

interface props extends AnswerBoxesComponentProps, DispatchToProps, StateToProps {
}

export interface AnswerBoxesComponentState {
    answerId: string;
    editAnswer: boolean;
    answers: Answer[];
}

export class AnswerBoxesComponent extends Component<props, AnswerBoxesComponentState> {
    state = {answerId: undefined, editAnswer: false, answers: []};

    componentWillMount() {
        this.setState({answers: cloneAnswers(this.props.answers)});
    }

    componentWillReceiveProps(nextProps: props) {
        if (JSON.stringify(nextProps.answers.map(e => e.content)) !=
            JSON.stringify((this.props.answers.map(e=> e.content)))) {
            this.setState({editAnswer: false, answers: cloneAnswers(nextProps.answers)});
        } else if (this.props.answers != nextProps.answers && this.state.editAnswer && this.state.answerId != undefined) {
            // for thumbs up and thumbs down
            let answers = cloneAnswers(nextProps.answers);
            let index = findIndex(answers, ans => ans._id === this.state.answerId);
            answers[index].content = arrayFind(answers, (ans) => ans._id === this.state.answerId).content;
            this.setState({answers: answers});
        } else {
            this.setState({answers:  cloneAnswers(nextProps.answers)});
        }
    }

    componentWillUnmount() {
        this.resetAnswers();
    }

    onEditClick = (answer: Answer) => {
        this.setState({answerId: answer._id, editAnswer: true})
    };

    onAnswerChange = (answer: Answer) => {
        let answers = this.state.answers;
        answers = answers.map((ans) => {
            ans = cloneAnswer(ans);
            if (answer._id === ans._id) {
                return answer;
            }
            return ans;
        });
        this.setState({answers: answers});
    };

    addAnswer = () => {
        let answers = cloneAnswers(this.state.answers);
        let answer = new Answer(this.props.question._id, this.props.user);
        answers.push(answer);
        this.setState({answerId: answer._id, editAnswer: true, answers});
    };

    resetAnswers = () => {
        this.setState({editAnswer: false, answerId: undefined});
        let answers = cloneAnswers(this.props.answers);
        this.setState({answers});
    };

    onSubmit = (answer: Answer) => {
        if (answer._id) {
            this.props.editAnswer(answer);
        } else {
            this.props.addAnswer(answer);
        }
    };

    render() {
        return (
            <div style={{position: "relative"}}>
                <Prompt
                    when={this.state.editAnswer}
                    message={location => (
                        `All unsaved changes will be discarded. Are you sure you want to leave?`
                    )}
                />
                {this.state.answers.map((answer) => {
                    let key = (answer._id) ? answer._id : "new question key";
                    const editMode = this.state.editAnswer && (answer._id === this.state.answerId || answer._id === undefined);
                    return (
                        <AnswerBoxView editMode={editMode}
                                       user={this.props.user}
                                       onSubmit={() => this.onSubmit(answer)}
                                       answer={answer}
                                       onAnswerChange={this.onAnswerChange}
                                       key={key}
                                       onEditClick={() => this.onEditClick(answer)}
                                       resetAnswer={this.resetAnswers}
                                       onMarkAnswerAsCorrect={() => this.props.markAnswerAsCorrect(answer)}
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

interface  StateToProps {
    user: UserDto
    question: Question;
    answers: Answer[];
}

interface DispatchToProps {
    editAnswer: (answer: Answer) => void;
    addAnswer: (answer: Answer) => void;
    markAnswerAsCorrect: (answer: Answer) => void;
}

const mapStateToProps = (state: AppStoreState): StateToProps => ({
    user: state.auth.user,
    question: state.questionPage.questionPage.question,
    answers: state.questionPage.questionPage.answers
});

const mapDispatchToProps = (dispatch): DispatchToProps => ({
    editAnswer: (answer: Answer) => dispatch(AnswerActions.updateAnswer(answer)),
    addAnswer: (answer: Answer) => dispatch(AnswerActions.createAnswer(answer)),
    markAnswerAsCorrect: (answer: Answer) => dispatch(AnswerActions.markAnswerAsCorrect(answer)),
});

export const AnswerBoxesView = connect<StateToProps, DispatchToProps, any>(
    mapStateToProps, mapDispatchToProps)(AnswerBoxesComponent);