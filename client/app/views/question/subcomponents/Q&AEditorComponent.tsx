import * as React from "react";
import {Component} from "react";
import {FrontEndQuestionModels} from "../../../models/QuestionModels";
import {EditorState} from "draft-js";
import {CustomEditor} from "../../../components/CustomEditor/CustomEditor";
import Button from "material-ui/Button";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;
import {isNullOrUndefined} from "util";

export interface QAEditorProps{
    value: EditorState;
    onChange: (state: EditorState) => any;
    onSubmit: () => any;
    readOnly?: boolean;
    style?:any;
    reset?: () => void;
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
                    !readOnly &&
                    <div style={{textAlign: "right"}}>
                        <Button color="primary" onClick={this.props.onSubmit}>save</Button>
                        {!isNullOrUndefined(this.props.reset) &&
                            <Button onClick={this.props.reset}>cancel</Button>
                        }
                    </div>
                }
            </div>
        )
    }
}