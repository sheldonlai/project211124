import * as React from "react";
import {Component} from "react";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {QuestionActions} from "../../actions/QuestionActions";
import {QuestionHomeReducerState} from "../../reducers/QuestionHomeReducer";
import {ErrorReducerState} from "../../reducers/ErrorReducer";
import {FrontEndQuestionModels} from "../../models/QuestionModels";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;

export interface QuestionViewProps extends QuestionHomeReducerState {
    loggedIn: boolean;
    globalError: ErrorReducerState;
    fetchQuestion: () => void;
}

class QuestionView extends Component<QuestionViewProps, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}