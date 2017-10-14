import * as React from "react";
import {Component} from "react";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import {AppStoreState} from "../../../stores/AppStore";
import Paper from "material-ui/Paper";
import {connect} from "react-redux";
import {CustomCard} from "../../../components/CardComponent/CardComponent";
import {DraftJsHelper} from "../../../../../server/utils/DraftJsHelper";
import Grid from "material-ui/Grid";
import Divider from "material-ui/Divider";
import Typography from "material-ui/Typography";
import {FrontEndRecruitmentModels} from "../../../models/RecruitmentModels";
import Recruitment = FrontEndRecruitmentModels.Recruitment;
import {EditorState} from "draft-js";
import {SplitVIewTemplate} from "../../../components/Templates/SplitVIewTemplate";
import Button from "material-ui/Button";
import {SemesterEnum} from "../../../../../server/enums/SemesterEnum";
import Input from "material-ui/TextField";

interface RecruitmentBoxComponentProps {
    user: UserDto; // current user
    recruitmentInfo: Recruitment;
    recruitmentEditorState: Recruitment;
    edit: boolean;
}

interface props extends RecruitmentBoxComponentProps, DispatchProps {

}

interface state{
    edit: boolean;
}

let paperStyle = {height: "100%", padding: 5};
let boxStyle = {height:"200%", width: "50%", padding: 5};

export class RecruitmentBoxComponent extends Component<props, state> {
    constructor(props){
        super(props);

        this.state = {
            edit: false,
        }
    }

    editButton = () => {
        if (!this.props.user || this.state.edit)
            return undefined;
        return (
            <Grid container justify="flex-end">
                <Grid item>
                    <Button onClick={() => this.setState({edit: true})}>
                        Edit
                    </Button>
                </Grid>
            </Grid>
        )
    }

    render() {
        let recruitment: Recruitment = {...this.props.recruitmentInfo};
        console.log(recruitment);
        return(
            <SplitVIewTemplate>
                <Paper style={paperStyle} elevation={0}>
                    {this.editButton()}
                    <Typography type="display1" noWrap>
                        {recruitment.title}
                    </Typography>
                    <SplitVIewTemplate>
                        <div>
                            {
                                recruitment.recruitmentYear &&
                                <Typography type="caption" gutterBottom>
                                    {recruitment.recruitmentYear}
                                </Typography>
                            }
                            {
                                recruitment.recruitmentSemester !== SemesterEnum.NOT_SPECIFIED &&
                                <Typography type="caption" gutterBottom>
                                    {recruitment.recruitmentSemester}
                                </Typography>
                            }
                        </div>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Typography type="caption">
                                    Recruiter: {recruitment.createdBy.username}
                                </Typography>
                            </Grid>
                        </Grid>
                    </SplitVIewTemplate>
                    <Divider/>
                    <Typography paragraph gutterBottom>
                        {DraftJsHelper.convertEditorStateToText(recruitment.content)}
                    </Typography>
                    <Divider/>
                </Paper>
                <div>
                    <Typography type="title">
                        Members:
                    </Typography>
                </div>
            </SplitVIewTemplate>
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