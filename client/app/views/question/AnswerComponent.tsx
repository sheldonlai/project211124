import * as React from "react";
import {AnswerDto} from "../../../../server/dtos/q&a/AnswerDto";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import {UserDto} from "../../../../server/dtos/auth/UserDto";

export interface AnswerComponentProps {
    key : any;
    answer: AnswerDto;
    user: UserDto;
    getEditor: any;

}

let headerStyle = {
    margin: "10px 0px",
    display: "inline-block"
}

let paperStyle = {height: "100%", margin: 10, padding: 15, paddingBottom: 0};

export class AnswerComponent extends React.Component<AnswerComponentProps, any> {
    constructor(props) {
        super(props);
    }


    render () {
        return <div></div>;
    }
}