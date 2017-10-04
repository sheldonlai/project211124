import {RecruitmentCommentDto} from "../../../../../server/dtos/recruitment/RecruitmentCommenDto";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import {Component} from "react";
import * as React from "react";
import {AppStoreState} from "../../../stores/AppStore";
import {connect} from "react-redux";

interface StateToProps{
    comments: RecruitmentCommentDto[];
    user: UserDto;
    lastUpdated: number;
    edit: boolean;
}

interface props extends StateToProps, DispatchProps {}

export class CommentBoxComponent extends Component<props, {}> {
    constructor(props){
        super();


    }

    render(){

        return(
            <div>

            </div>
        )
    }
}

const mapStateToProps = (state: AppStoreState) => ({
    comments: state.recruitmentPage.recruitmentPage.comments,
    user: state.auth.user,
    lastUpdated: undefined,
    edit: undefined,
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
});

interface DispatchProps{

}

export const CommentBoxView = connect<StateToProps, DispatchProps, any>(
    mapStateToProps, mapDispatchToProps)(CommentBoxComponent);