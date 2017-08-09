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
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import {DropDownSelect} from "../../../components/Forms/DropDownSelect";
import {QuestionEditorReducerState} from "../../../reducers/QuestionEditorReducer";
import Question = FrontEndQuestionModels.Question;
import cloneQuestion = FrontEndQuestionModels.cloneQuestion;
import {DisplayField} from "../../../components/Forms/DisplayField";
import {CategoryTypeEnum} from "../../../../../server/enums/CategoryTypeEnum";

interface stateToProps {
    question: Question;
    user: UserDto;
    questionEditorState: Question;
    edit: boolean;
}

interface DispatchProps {
    editQuestion: (question: Question) => void;
    changeQuestionEditorState: (state: QuestionEditorReducerState) => void;
}
interface props extends stateToProps, DispatchProps{}
export class QuestionInfoBox extends React.Component<props, {}> {

    onDifficultyChange = (difficulty: QuestionDifficulty) => {
        let question = cloneQuestion(this.props.questionEditorState);
        question.difficulty = difficulty;
        this.props.changeQuestionEditorState({
            edit: this.props.edit,
            question
        });
    };

    opnPublicityChange = (publicityStatus: PublicityStatus) => {
        let question = cloneQuestion(this.props.questionEditorState);
        question.publicityStatus = publicityStatus;
        this.props.changeQuestionEditorState({
            edit: this.props.edit,
            question
        });
    };

    onCategoryChange = (cat: CategoryTypeEnum) => {
        let question = cloneQuestion(this.props.questionEditorState);
        question.category = cat;
        this.props.changeQuestionEditorState({
            edit: this.props.edit,
            question
        });
    };

    row = (label: string, value: string) => {
        return <DisplayField label={label} value={value}/>
    };

    saveChanges = () => {
        this.props.editQuestion(this.props.questionEditorState);
    };

    view = () => {
        const question = this.props.question;
        return (
            <div>
                {this.row("Type", convertEnumStringToViewString(PublicityStatus[question.publicityStatus]))}
                {this.row("Category", convertEnumStringToViewString(CategoryTypeEnum[question.category]))}
                {this.row("Level",
                    convertEnumStringToViewString(QuestionEducationLevel[question.difficulty.educationLevel]))}
                {question.difficulty.educationLevel != QuestionEducationLevel.NOT_SPECIFIED &&
                this.row("Difficulty",
                    convertEnumStringToViewString(DifficultyLevel[question.difficulty.difficultyLevel]))}
            </div>
        )
    };
    editor = () => {
        return (
            <div>
                <DropDownSelect
                    placeholder="Publicity Status"
                    data={getDropDownDataFromStringEnum(PublicityStatus)}
                    value={this.props.questionEditorState.publicityStatus}
                    onChange={this.opnPublicityChange}
                />
                <DropDownSelect
                    placeholder="Category"
                    data={getDropDownDataFromStringEnum(CategoryTypeEnum)}
                    onChange={this.onCategoryChange}
                    value={this.props.questionEditorState.category}
                />
                <QuestionDifficultyMenu onDifficultyChange={this.onDifficultyChange}
                                        difficulty={this.props.questionEditorState.difficulty} />
            </div>
        );
    };

    render() {


        return (
            <div>
                <Divider />
                    {this.props.edit? this.editor(): this.view()}
                <Divider />
            </div>
        );
    }
}

const mapStateToProps = (state: AppStoreState) => ({
    question: state.questionPage.questionPage.question,
    user: state.auth.user,
    questionEditorState: state.questionEditorState.question,
    edit: state.questionEditorState.edit
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
    editQuestion: (question: Question) => dispatch(QuestionActions.updateQuestion(question)),
    changeQuestionEditorState: (state: QuestionEditorReducerState) =>
        dispatch(QuestionActions.changeQuestionEditorState(state)),
});

export const QuestionInfoBoxView = connect<stateToProps, DispatchProps, any>(
    mapStateToProps,
    mapDispatchToProps
)(QuestionInfoBox);