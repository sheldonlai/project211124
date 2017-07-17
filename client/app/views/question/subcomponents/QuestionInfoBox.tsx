import * as React from "react";
import {FrontEndQuestionModels} from "../../../models/QuestionModels";
import Typography from "material-ui/Typography";
import {connect} from "react-redux";
import {AppStoreState} from "../../../stores/AppStore";
import Divider from "material-ui/Divider";
import {PublicityStatus} from "../../../../../server/enums/PublicityStatus";
import {convertEnumStringToViewString, getDropDownDataFromStringEnum} from "../../../utils/utils";
import {DifficultyLevel, QuestionEducationLevel} from "../../../../../server/enums/QuestionEducationLevel";
import {QuestionActions} from "../../../actions/QuestionActions";
import {QuestionDifficultyMenu} from "./QuestionDifficultyMenu";
import {QuestionDifficulty} from "../../../../../server/models/Question";
import Button from "material-ui/Button";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;
import Question = FrontEndQuestionModels.Question;
import {DropDownSelect} from "../../../components/DropDownSelect";
import cloneQuestion = FrontEndQuestionModels.cloneQuestion;

interface stateToProps {
    question: Question;
    user: UserDto;
}

interface DispatchProps {
    editQuestion: (question: Question) => void;
}

interface state {
    difficulty: QuestionDifficulty;
    publicityStatus: PublicityStatus;
    edit: boolean;
}
interface props extends stateToProps, DispatchProps{}
export class QuestionInfoBox extends React.Component<props, state> {
    state = {
        difficulty: undefined,
        edit: false,
        publicityStatus: undefined
    }
    componentWillMount() {
        this.setState({difficulty : this.props.question.difficulty, publicityStatus: this.props.question.publicityStatus});
    }

    componentWillReceiveProps(nextProps: props) {
        if (JSON.stringify(nextProps.question.difficulty) !== JSON.stringify(this.props.question.difficulty) ||
            JSON.stringify(nextProps.question.publicityStatus) !== JSON.stringify(this.props.question.publicityStatus)){
            this.setState({difficulty : this.props.question.difficulty, publicityStatus: this.props.question.publicityStatus});
        }
    }

    onDifficultyChange = (difficulty: QuestionDifficulty) => {
        this.setState({difficulty});
    }

    row = (label: string, value: string) => {
        return (
            <div style={{marginTop: 20}}>
                <Typography type="caption" gutterBottom>
                    {label}
                </Typography>
                <Typography type="body1" gutterBottom>
                    {value}
                </Typography>
            </div>
        )
    };

    saveChanges = () => {
        let question = cloneQuestion(this.props.question);
        question.publicityStatus = this.state.publicityStatus;
        question.difficulty = this.state.difficulty;
        this.props.editQuestion(question);
    }

    view = () => {
        const question = this.props.question;
        const editable = this.props.user && this.props.user.username === this.props.question.author.username;
        return (
            <div>
                {editable? <Button onClick={()=>this.setState({edit: true})}>Edit</Button>: undefined}
                {this.row("type", convertEnumStringToViewString(PublicityStatus[question.publicityStatus]))}
                {this.row("level", convertEnumStringToViewString(QuestionEducationLevel[question.difficulty.educationLevel]))}
                {question.difficulty.educationLevel != QuestionEducationLevel.NOT_SPECIFIED &&
                this.row("difficulty", convertEnumStringToViewString(DifficultyLevel[question.difficulty.difficultyLevel]))}
            </div>
        )
    }
    editor = () => {
        const question = this.props.question;
        return (
            <div>
                <DropDownSelect
                    placeholder="Publicity Status"
                    data={getDropDownDataFromStringEnum(PublicityStatus)}
                    value={this.state.publicityStatus}
                    onChange={(publicityStatus) => this.setState({publicityStatus})}
                />
                <QuestionDifficultyMenu onDifficultyChange={this.onDifficultyChange} difficulty={this.state.difficulty} />
                <Button onClick={this.saveChanges}>Save</Button>
            </div>
        );
    }

    render() {


        return (
            <div>
                <Divider />
                    {this.state.edit? this.editor(): this.view()}
                <Divider />
            </div>
        );
    }
}

const mapStateToProps = (state: AppStoreState) => ({
    question: state.questionPage.questionPage.question,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
    editQuestion: (question: Question) => dispatch(QuestionActions.updateQuestion(question)),
});

export const QuestionInfoBoxView = connect<stateToProps, DispatchProps, any>(
    mapStateToProps,
    mapDispatchToProps
)(QuestionInfoBox);