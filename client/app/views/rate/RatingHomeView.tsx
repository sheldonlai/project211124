import * as React from "react";
import {connect} from "react-redux";

// TODO

export class RatingHomeViewComponent extends React.Component<any> {
    render() {
        return (
            <div>

            </div>
        )
    }
}

export const RatingHomeView = connect<any, any, any>(
    () =>({})
)(RatingHomeViewComponent);