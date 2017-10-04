import * as React from "react";
import {Component} from "react";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import {RecruitmentDto} from "../../../../../server/dtos/recruitment/RecruitmentDto";
import {AppStoreState} from "../../../stores/AppStore";
import Paper from "material-ui/Paper";
import {connect} from "react-redux";
import {CustomCard} from "../../../components/CardComponent/CardComponent";
import {DraftJsHelper} from "../../../../../server/utils/DraftJsHelper";

interface RecruitmentBoxComponentProps {
    user: UserDto; // current user
    recruitmentInfo: RecruitmentDto;
    recruitmentEditorState: RecruitmentDto;
    edit: boolean;
}

interface props extends RecruitmentBoxComponentProps, DispatchProps {

}

let paperStyle = {height: "100%", padding: 5};

export class RecruitmentBoxComponent extends Component<props, {}> {
    constructor(props){
        super(props);
    }

    render() {
        let recruitment: RecruitmentDto = {...this.props.recruitmentInfo};
        console.log(recruitment);
        return (
            <div>
                <Paper style={paperStyle} elevation={0}>
                    <div>
                        <CustomCard title={recruitment.title}
                                    content={DraftJsHelper.convertRawToText(recruitment.content)}
                                    date={new Date()}
                                    wide
                        />
                    </div>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStoreState) => ({
    user: state.auth.user,
    recruitmentInfo: state.recruitmentPage.recruitmentPage,
    recruitmentEditorState: undefined,
    edit: undefined,
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
});

interface DispatchProps {
}

export const RecruitmentBoxView = connect<RecruitmentBoxComponentProps, DispatchProps, any>(
    mapStateToProps, mapDispatchToProps)(RecruitmentBoxComponent);