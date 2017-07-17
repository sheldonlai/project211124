import * as React from "react";
import {DropDownSelect} from "../../../components/DropDownSelect";
import {DifficultyLevel, QuestionEducationLevel} from "../../../../../server/enums/QuestionEducationLevel";
import {getDropDownDataFromNumericalEnum, getDropDownDataFromStringEnum} from "../../../utils/utils";
import {QuestionDifficulty} from "../../../../../server/models/Question";

interface props {
    onDifficultyChange: (diff: QuestionDifficulty) => void;
    difficulty: QuestionDifficulty;
}

export class QuestionDifficultyMenu extends React.Component<props> {
    render() {
        return (
            <div>
                <DropDownSelect
                    placeholder="Question Level"
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