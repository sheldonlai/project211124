/**
 * Created by SHELDON on 6/24/2017.
 */
import * as React from "react";
import {Component} from "react";
import Paper from "material-ui/Paper";

export interface ModalWindowProps {
    show: boolean;
    children?: any;
    paperStyle?: any;
    contentStyle?: any;
    onClose: () => void;
    headerLabel?: string;
}

export class ModalWindow extends Component<ModalWindowProps, any> {

    getTop = () => {
        return (this.props.show) ? 0 : -5000;
    }

    getPaperStyle = () => {
        let defaultStyle = {
            margin: 'auto',
            marginTop: 200,
            width: 500,
            height: 400
        };
        // override the default
        for (let key in this.props.paperStyle) {
            defaultStyle[key] = this.props.paperStyle[key];
        }
        return defaultStyle;
    }

    getContentStyle = () => {
        let defaultStyle = {
            padding: 10,
            textAlign: 'center'
        };
        // override the default
        for (let key in this.props.contentStyle) {
            defaultStyle[key] = this.props.contentStyle[key];
        }
        return defaultStyle;
    }

    handleClose = () => {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        return (<div style={{
                position: 'fixed', left: 0, top: this.getTop(), width: '100%',
                height: '100%', backgroundColor: 'rgba(255,255,255,0.5)',
                zIndex: 5000
            }}>
                <Paper style={this.getPaperStyle()} zDepth={5} rounded={true}>
                    <div className="modal-header" style={{width: '100%', height: 30}}>
                        <div >{this.props.headerLabel}</div>
                        <div style={{
                            float: 'right', cursor: 'pointer',
                            fontSize: 26, padding: 4, width: 30
                        }}
                             onClick={this.handleClose}>
                            ×
                        </div>
                    </div>
                    <div style={this.getContentStyle()}>
                        {this.props.children}
                    </div>
                </Paper>
            </div>
        )
    }
}