import * as React from "react";
import {connect} from "react-redux";

// TODO

export class ServiceHomeComponent extends React.Component<any> {
    render() {
        return (
            <div>

            </div>
        )
    }
}

export const ServiceHomeView = connect<any, any, any>(
    () =>({})
)(ServiceHomeComponent);