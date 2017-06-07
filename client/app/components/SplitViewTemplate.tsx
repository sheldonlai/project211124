import {Component} from 'react';
import * as React from 'react';

export interface SplitViewTemplateProps {
    mainComponent : any;
    sideComponent : any;

}

export class SplitViewTemplate extends Component<SplitViewTemplateProps, any>{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <this.props.mainComponent style={{width: '70%', }} />
                <this.props.sideComponent  />
            </div>
        )
    }
}