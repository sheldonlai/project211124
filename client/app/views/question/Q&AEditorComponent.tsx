import * as React from "react";
import {Component} from "react";
import {FrontEndQuestionModels} from "../../models/QuestionModels";
import {EditorState} from "draft-js";
import {CustomEditor} from "../../components/CustomEditor/CustomEditor";
import Button from "material-ui/Button";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;

export interface QAEditorProps{
    value: EditorState;
    onChange: (state: EditorState) => any;
    onSubmit: () => any;
    readOnly?: boolean
}

export class QAEditorComponent extends Component<QAEditorProps> {
    render() {
        const readOnly = this.props.readOnly;
        return (
            <div style={{marginBottom: 15}}>
                <CustomEditor value={this.props.value} onChange={this.props.onChange} readOnly={readOnly}
                            border={!readOnly}
                />
                {
                    !this.props.readOnly &&
                    <div style={{textAlign: "right"}}>
                        <Button raised  onClick={this.props.onSubmit}>save</Button>
                    </div>
                }
            </div>
        )
    }
}