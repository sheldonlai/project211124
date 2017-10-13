import * as React from "react";
import {DropDownSelect} from "../../../components/Forms/DropDownSelect";
import {DifficultyLevel, QuestionEducationLevel} from "../../../../../server/enums/QuestionEducationLevel";
import {getDropDownDataFromNumericalEnum, getDropDownDataFromStringEnum} from "../../../utils/utils";
import {QuestionDifficulty} from "../../../../../server/models/Question";

interface props {
    onDifficultyChange: (diff: QuestionDifficulty) => void;
    difficulty: QuestionDifficulty;
    placeholder?: string;
}

export class QuestionDifficultyMenu extends React.Component<props> {
    render() {
        let questionPlaceHolder: string = this.props.placeholder?this.props.placeholder:"Question Level";

        return (
            <div>
                <DropDownSelect
                    placeholder={questionPlaceHolder}
                    data={getDropDownDataFromStringEnum(QuestionEducationLevel)}
                    onChange={(educationLevel) => this.props.onDifficultyChange({
                        educationLevel, difficultyLevel: this.props.difficulty.difficultyLevel
                    })}
                    value={this.props.difficulty.educationLevel}
                />
                { this.props.difficulty.educationLevel != QuestionEducationLevel.NOT_SPECIFIED &&
                <DropDownSelect
                    placeholder="Difficulty Level"
                    data={getDropDownDataFromNumericalEnum(DifficultyLevel)}
                    onChange={(difficultyLevel) => this.props.onDifficultyChange({
                        educationLevel: this.props.difficulty.educationLevel, difficultyLevel
                    })}
                    value={this.props.difficulty.difficultyLevel}
                />}
            </div>
        );
    }
}