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

interface RecruitmentBoxComponentProps {
    user: UserDto; // current user
    recruitmentInfo: Recruitment;
    recruitmentEditorState: Recruitment;
    edit: boolean;
}

interface props extends RecruitmentBoxComponentProps, DispatchProps {

}

let paperStyle = {height: "100%", padding: 5};
let boxStyle = {height:"200%", width: "50%", padding: 5};

export class RecruitmentBoxComponent extends Component<props, {}> {
    constructor(props){
        super(props);
    }

    render() {
        let recruitment: Recruitment = {...this.props.recruitmentInfo};
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <Grid item>
                                <Paper style={paperStyle} elevation={0}>
                                    <div>
                                        <CustomCard title={recruitment.title}
                                                    content={DraftJsHelper.convertEditorStateToText(recruitment.content)}
                                                    date={new Date()}
                                                    wide
                                        />
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}>
                        <Grid container direction="column">
                            <Grid item>
                                {(this.props.recruitmentInfo.groupMates.length > 0) &&
                                <Typography type="body2">Members:</Typography>
                                }
                            </Grid>
                            <Grid item>
                                {
                                    this.props.recruitmentInfo.groupMates.map(member => {
                                        return (
                                            <Paper style={boxStyle} elevation={1}>
                                                <Typography type="body2">{member.username}</Typography>
                                            </Paper>)
                                    })
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
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