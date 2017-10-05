import {Component} from "react";
import * as React from "react";
import {AppStoreState} from "../../../stores/AppStore";
import {connect} from "react-redux";
import {RecruitmentCommentDto} from "../../../../../server/dtos/recruitment/RecruitmentCommenDto";
import Paper from "material-ui/Paper";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Divider from "material-ui/Divider";
import {DraftJsHelper} from "../../../../../server/utils/DraftJsHelper";
import {QAEditorComponent} from "../../question/subcomponents/Q&AEditorComponent";
import {QuestionFooterComponent} from "../../question/subcomponents/QuestionFooterComponent";

interface props{
    comment: RecruitmentCommentDto;
    recruiter: UserDto;
    user: UserDto;
    member: boolean;
}

interface state{
    editMode: boolean;
}

const paperStyle = {height: "100%", padding: 5, width: "70%"};

export class CommentBoxComponent extends Component<props, state>{
    constructor(props){
        super();
        this.state = {
            editMode: false,
        }
    }

    render(){
        const editable = (this.props.user.username === this.props.comment.createdBy.username);
        const masterView = (this.props.user.username === this.props.recruiter.username);
        const isRecruiter = (this.props.recruiter.username === this.props.comment.createdBy.username);
        return(
            <div style={{ marginLeft: "240px", }}>
                <Paper style={{...paperStyle, marginBottom: 10, marginTop: 10}} elevation={1}>
                    <Grid container justify="flex-end">
                        <Grid item>
                            {masterView && !editable &&
                            <Button color="primary">
                                Recruit into team
                            </Button>}
                        </Grid>
                        <Grid item>
                            {editable && !this.state.editMode &&
                            <Button color="primary" onClick={() => this.setState({editMode: true})}>
                                Edit
                            </Button>
                            }
                        </Grid>
                    </Grid>
                    <QAEditorComponent value={DraftJsHelper.convertRawToEditorState(this.props.comment.comment)}
                                       onChange={() => {}}
                                       onSubmit={() => {}}
                                       readOnly={!this.state.editMode}
                                       style={{fontSize: 14}} reset={() => {}}
                    />
                    <Divider/>
                    <QuestionFooterComponent
                        author={this.props.comment.createdBy}
                        createdUtc={this.props.comment.createdAt}
                    />
                </Paper>
                {isRecruiter &&
                <Grid container align={"center"}
                      style={{position: "relative", left:-100, top: -80, height: "100%", width: "100%"}}>
                    <Grid item>
                        <Button color="primary" disabled style={{display: "inline"}}>
                            RECRUITER
                        </Button>
                    </Grid>
                </Grid>
                }
            </div>
        )
    }
}

export const CommentBoxView = CommentBoxComponent;