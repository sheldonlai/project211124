import {Component} from "react";
import * as React from "react";
import {AppStoreState} from "../../../stores/AppStore";
import {connect} from "react-redux";
import {RecruitmentCommentDto} from "../../../../../server/dtos/recruitment/RecruitmentCommenDto";
import Paper from "material-ui/Paper";

interface props{
    comment: RecruitmentCommentDto;
}

interface state{
    edit: boolean;
}

const paperStyle = {height: "100%", padding: 5,};

export class CommentBoxComponent extends Component<props, state>{
    constructor(props){
        super();

    }

    render(){

        return(
            <div style={{ marginLeft: "40px", }}>
                <Paper style={{...paperStyle, marginBottom: 10, marginTop: 10, position: "relative"}} elevation={1}>

                </Paper>
            </div>
        )
    }
}

export const CommentBoxView = connect<>(

)(CommentBoxComponent);