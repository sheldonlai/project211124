import * as React from "react";
import {Component} from "react";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import {RecruitmentDto} from "../../../../../server/dtos/recruitment/RecruitmentDto";
import {AppStoreState} from "../../../stores/AppStore";

interface RecruitmentBoxProps{
    user: UserDto;
    recruitmentInfo: RecruitmentDto;
    recruitmentEditorState: RecruitmentDto;
    edit: boolean;
}

interface DispatchProps{

}

interface props extends RecruitmentBoxProps, DispatchProps{}

let paperStyle = {height: "100%", padding: 5};

export class RecruitmentBoxComponent extends Component<props, {}>{
    constructor(props){
        super(props);
    }


}

/*
 user: UserDto;
 recruitmentInfo: RecruitmentDto;
 recruitmentEditorState: RecruitmentDto;
 edit: boolean;
 */

const mapStateToProps = (state: AppStoreState) => ({
    user: state.auth.user,
    recruitmentInfo: state.recruitmentPage.recruitmentPage,
    recruitmentEditorState: undefined,
    edit: undefined,
});

