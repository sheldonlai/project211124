import * as React from 'react';
import {Component} from 'react';
import {createStyleSheet} from 'material-ui/styles';
import Chip from 'material-ui/Chip';

export interface ChipListComponentProps {
    keyName?: string
    chips: any[];
    handleRequestDelete?: (array: any[]) => void;
    [key: string]: any;
}
export class ChipListComponent extends Component<ChipListComponentProps> {
    chipStyle = {
        display: "inline-block"
    };
    handleRequestDelete = (data) => {
        let chipData = [...this.props.chips];
        const chipToDelete = chipData.indexOf(data);
        chipData.splice(chipToDelete, 1);
        this.props.handleRequestDelete(chipData);
    };

    render() {
        return (<div>
            {this.props.chips.map(data => {
                const value = (this.props.keyName) ? data[this.props.keyName] : data;
                let rest = {...this.props};
                delete rest.chips;
                delete rest.keyName;
                delete rest.onRequestDelete;
                delete rest.handleRequestDelete;
                return (
                <div style={this.chipStyle} key={value}>
                    <Chip
                        label={value}
                        onRequestDelete={
                            this.props.handleRequestDelete ?
                                () => this.handleRequestDelete(data) :
                                undefined
                        }
                        {...rest}
                    />
                </div>
                );
            })}
        </div>);
    }
}