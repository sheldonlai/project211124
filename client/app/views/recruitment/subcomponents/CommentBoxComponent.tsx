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
import {RecruitmentActions} from "../../../actions/RecruitmentActions";

interface props{
    comment: RecruitmentCommentDto;
    recruiter: UserDto;
    user: UserDto;
    member: boolean;
    updateComment: (comment: RecruitmentCommentDto) => void;
    recruitMember: (member: UserDto) => void;
}

interface state{
    editedComment: RecruitmentCommentDto;
    editMode: boolean;
}

const paperStyle = {height: "100%", padding: 5, width: "70%"};

export class CommentBoxComponent extends Component<props, state>{
    editedComment: RecruitmentCommentDto;
    constructor(props){
        super();
        this.editedComment = {...props.comment};
        this.state = {
            editedComment: this.editedComment,
            editMode: false,
        }
    }

    updateComment = (field: string, val: any) => {
        let comment = {...this.state.editedComment};
        comment[field] = val;
        this.setState({editedComment: comment});
    };

    cancelEdit = () => {
        this.setState({editedComment: this.editedComment, editMode: false});
    };

    render(){
        const editable = (this.props.user.username === this.props.comment.createdBy.username);
        const masterView = (this.props.user.username === this.props.recruiter.username);
        const isRecruiter = (this.props.recruiter.username === this.props.comment.createdBy.username);
        return(
            <div style={{ marginLeft: "240px", }}>
                <Paper style={{...paperStyle, marginBottom: 10, marginTop: 10}} elevation={1}>
                    <Grid container justify="flex-end">
                        <Grid item>
                            {masterView && !editable && !this.props.member &&
                            <Button color="primary" onClick={() => {
                                this.props.recruitMember(this.props.comment.createdBy)
                            }}>
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
                    <QAEditorComponent value={DraftJsHelper.convertRawToEditorState(this.state.editedComment.comment)}
                                       onChange={(content) => {this.updateComment("comment", DraftJsHelper.convertEditorStateToRaw(content))}}
                                       onSubmit={() => {this.props.updateComment(this.state.editedComment)}}
                                       readOnly={!this.state.editMode}
                                       style={{fontSize: 14}} reset={this.cancelEdit}
                    />
                    <Divider/>
                    <QuestionFooterComponent
                        author={this.props.comment.createdBy}
                        createdUtc={this.props.comment.createdAt}
                    />
                </Paper>
                {(isRecruiter &&
                <div>
                    <Grid container align={"center"}>
                        <Grid item style={{position: "relative", left:-100, top: -100, height: "100%"}}>
                            <Button disabled style={{display: "inline", color: "green"}}>
                                RECRUITER
                            </Button>
                        </Grid>
                    </Grid>
                </div>)
                || (this.props.member &&
                <div>
                    <Grid container align={"center"}>
                        <Grid item style={{position: "relative", left:-100, top: -100, height: "100%"}}>
                            <Button disabled style={{display: "inline", color: "blue"}}>
                                MEMBER
                            </Button>
                        </Grid>
                    </Grid>
                </div>)}
            </div>
        )
    }
}

export const CommentBoxView = CommentBoxComponent;