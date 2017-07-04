import * as React from "react";
import {Component} from "react";
import {FrontEndQuestionModels} from "../../../models/QuestionModels";
import {EditorState} from "draft-js";
import {CustomEditor} from "../../../components/CustomEditor/CustomEditor";
import Button from "material-ui/Button";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;

export interface QAEditorProps{
    value: EditorState;
    onChange: (state: EditorState) => any;
    onSubmit: () => any;
    readOnly?: boolean;
    style?:any;
}

export class QAEditorComponent extends Component<QAEditorProps> {
    render() {
        const readOnly = this.props.readOnly;
        return (
            <div style={{marginBottom: 15}}>
                <CustomEditor value={this.props.value} onChange={this.props.onChange} readOnly={readOnly}
                            border={!readOnly} style={this.props.style}
                />
                {
                    !this.props.readOnly &&
                    <div style={{textAlign: "right"}}>
                        <Button onClick={this.props.onSubmit}>save</Button>
                    </div>
                }
            </div>
        )
    }
}