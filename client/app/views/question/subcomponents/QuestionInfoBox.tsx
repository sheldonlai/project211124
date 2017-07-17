import * as React from "react";
import {FrontEndQuestionModels} from "../../../models/QuestionModels";
import Typography from "material-ui/Typography";
import {connect} from "react-redux";
import {AppStoreState} from "../../../stores/AppStore";
import Divider from "material-ui/Divider";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;
import {PublicityStatus} from "../../../../../server/enums/PublicityStatus";
import {convertEnumStringToViewString} from "../../../utils/utils";
import {DifficultyLevel, QuestionEducationLevel} from "../../../../../server/enums/QuestionEducationLevel";
import {QuestionActions} from "../../../actions/QuestionActions";
import Question = FrontEndQuestionModels.Question;

interface stateToProps {
    question: Question;
}

interface DispatchProps {
    editQuestion: (question: Question) => void;
}
export class QuestionInfoBox extends React.Component<stateToProps & DispatchProps> {

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
    }

    render() {
        const question = this.props.question;

        return (
            <div>
                <Divider />
                {this.row("type", convertEnumStringToViewString(PublicityStatus[question.publicityStatus]))}
                {this.row("level", convertEnumStringToViewString(QuestionEducationLevel[question.difficulty.educationLevel]))}
                {question.difficulty.educationLevel != QuestionEducationLevel.NOT_SPECIFIED &&
                    this.row("difficulty", convertEnumStringToViewString(DifficultyLevel[question.difficulty.difficultyLevel]))}
                <Divider />
            </div>
        );
    }
}

const mapStateToProps = (state: AppStoreState) => ({
    question: state.questionPage.questionPage.question
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
    editQuestion: (question: Question) => dispatch(QuestionActions.updateQuestion(question)),
});

export const QuestionInfoBoxView = connect<stateToProps, DispatchProps, any>(
    mapStateToProps,
    mapDispatchToProps
)(QuestionInfoBox);