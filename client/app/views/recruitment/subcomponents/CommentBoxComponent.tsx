import {Component} from "react";
import * as React from "react";
import Paper from "material-ui/Paper";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Divider from "material-ui/Divider";
import {QAEditorComponent} from "../../question/subcomponents/Q&AEditorComponent";
import {QuestionFooterComponent} from "../../question/subcomponents/QuestionFooterComponent";
import {FrontEndRecruitmentModels} from "../../../models/RecruitmentModels";
import RecruitmentComment = FrontEndRecruitmentModels.RecruitmentComment;

interface props{
    comment: RecruitmentComment;
    recruiter: UserDto;
    user: UserDto;
    member: boolean;
    updateComment: (comment: RecruitmentComment) => void;
    recruitMember: (comment: RecruitmentComment) => void;
}

interface state{
    editedComment: RecruitmentComment;
    editMode: boolean;
}

const paperStyle = {height: "100%", padding: 5, width: "70%"};

export class CommentBoxComponent extends Component<props, state>{
    editedComment: RecruitmentComment;
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
        const editable = this.props.user?((this.props.user.username === this.props.comment.createdBy.username)):false;
        const masterView = this.props.user?((this.props.user.username === this.props.recruiter.username)):false;
        const isRecruiter = (this.props.recruiter.username === this.props.comment.createdBy.username);
        return(
            <div style={{ marginLeft: "240px", }}>
                <Paper style={{...paperStyle, marginBottom: 10, marginTop: 10}} elevation={1}>
                    <Grid container justify="flex-end">
                        <Grid item>
                            {masterView && !editable && !this.props.member &&
                            <Button color="primary" onClick={() => {
                                this.props.recruitMember(this.props.comment)
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
                    <QAEditorComponent value={this.state.editedComment.comment}
                                       onChange={(content) => {this.updateComment("comment", content)}}
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