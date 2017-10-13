import {RecruitmentCommentDto} from "../../../../../server/dtos/recruitment/RecruitmentCommenDto";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import {Component} from "react";
import * as React from "react";
import {AppStoreState} from "../../../stores/AppStore";
import {connect} from "react-redux";
import Button from "material-ui/Button";
import {RecruitmentRequestEnum, UserRequestEnum} from "../../../../../server/enums/RecruitmentRequestEnum";
import AddIcon from "material-ui-icons/Add";
import {DraftJsHelper} from "../../../../../server/utils/DraftJsHelper";
import {EditorState} from "draft-js";
import Paper from "material-ui/Paper";
import {getDropDownDataFromStringEnum} from "../../../utils/utils";
import {DropDownSelect} from "../../../components/Forms/DropDownSelect";
import Divider from "material-ui/Divider";
import {CustomEditor} from "../../../components/CustomEditor/CustomEditor";
import {QAEditorComponent} from "../../question/subcomponents/Q&AEditorComponent";
import Grid from "material-ui/Grid";
import {RecruitmentActions} from "../../../actions/RecruitmentActions";
import {CommentBoxView} from "./CommentBoxComponent";
import {FrontEndRecruitmentModels} from "../../../models/RecruitmentModels";
import RecruitmentComment = FrontEndRecruitmentModels.RecruitmentComment;
import commentModelToDto = FrontEndRecruitmentModels.commentModelToDto;

interface StateToProps{
    comments: RecruitmentComment[];
    user: UserDto;
    lastUpdated: number;
    edit: boolean;
    pageId: string;
    recruiter: UserDto;
    groupMates: UserDto[];
}

interface props extends StateToProps, DispatchProps {}

interface state{
    newComment: RecruitmentComment;
    addComment: boolean;
}
const paperStyle = {height: "100%", padding: 5,};
export class CommentBoxComponent extends Component<props, state> {
    newComment: RecruitmentComment;
    constructor(props){
        super();
        this.newComment = new RecruitmentComment();
        this.state = {
            newComment: this.newComment,
            addComment: false,
        }
    }

    updateComment = (field: string, val: any) => {
        let comment = {...this.state.newComment};
        comment[field] = val;
        this.setState({newComment: comment});
    };

    submitComment = () => {
        let commentDto: RecruitmentCommentDto = commentModelToDto({...this.state.newComment});
        this.setState({newComment: this.newComment, addComment: false});
        this.props.addComment(commentDto, this.props.pageId);
    };

    cancelComment = () => {
        this.setState({newComment: this.newComment, addComment: false});
    };

    commentEditor = () => {
        let masterView = this.props.user._id === this.props.recruiter._id;
        return(
            <div>
                <Paper style={paperStyle} elevation={0}>
                    {!masterView &&
                        <DropDownSelect
                            placeholder={"Request to join"}
                            data={getDropDownDataFromStringEnum(UserRequestEnum)}
                            onChange={(request) => this.updateComment("request", request)}
                            value={this.state.newComment.request}
                        />
                    }
                    <Divider/>
                    <QAEditorComponent value={this.state.newComment.comment}
                                       onChange={(content) => this.updateComment("comment", content)}
                                       onSubmit={this.submitComment} readOnly={!this.state.addComment}
                                       style={{fontSize: 14}} reset={this.cancelComment}
                    />
                </Paper>
            </div>
        )
    };

    userIsMember = (userId: string) => {
        for(let i=0; i<this.props.groupMates.length; i++){
            if(this.props.groupMates[i]._id == userId){
                return true;
            }
        }
        return false;
    };

    onRecruitMember = (comment: RecruitmentComment) => {
        let updatedComment = commentModelToDto({...comment});
        updatedComment.request = RecruitmentRequestEnum.JOINED;
        this.props.updateComment(updatedComment, this.props.pageId);
        this.props.recruitMember(updatedComment.createdBy, this.props.pageId);
    };

    render(){
        let comments = {...this.props.comments};
        return(
            <div style={{position: "relative"}}>
                {this.props.comments.map(comment => {
                    return <CommentBoxView comment={comment}
                                           recruiter={this.props.recruiter} user={this.props.user}
                                           member={this.userIsMember(comment.createdBy._id)}
                                           updateComment={(comment) => {
                                               let commentDto: RecruitmentCommentDto = commentModelToDto(comment);
                                               this.props.updateComment(commentDto, this.props.pageId);
                                           }}
                                           recruitMember={(comment) => {this.onRecruitMember(comment)}}
                                           key={comment._id}
                            />
                })}
                <Grid container justify="center" direction="column" align="center">
                    <Grid item>
                        {this.state.addComment && this.commentEditor()}
                    </Grid>
                    <Grid item>
                        {(this.props.user && !this.state.addComment) &&
                        <div key="edit-answer-button" style={{float: 'right', marginTop: 5}}>
                            <Button fab color="primary" onClick={() => this.setState({addComment: true})}>
                                <AddIcon/>
                            </Button>
                        </div>}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStoreState) => ({
    comments: state.recruitmentPage.recruitmentPage.comments,
    user: state.auth.user,
    lastUpdated: undefined,
    edit: undefined,
    pageId: state.recruitmentPage.recruitmentPage._id,
    recruiter: state.recruitmentPage.recruitmentPage.createdBy,
    groupMates: state.recruitmentPage.recruitmentPage.groupMates,
});

interface DispatchProps{
    addComment: (comment: RecruitmentCommentDto, recruitmentId: string) => void;
    updateComment: (comment: RecruitmentCommentDto, recruitmentId: string) => void;
    recruitMember: (member: UserDto, recruitmentId: string) => void;
}

const mapDispatchToProps = (dispatch): DispatchProps => ({
    addComment: (comment: RecruitmentCommentDto, recruitmentId: string) => dispatch(RecruitmentActions.addRecruitmentComment(comment, recruitmentId)),
    updateComment: (comment: RecruitmentCommentDto, recruitmentId: string) => dispatch(RecruitmentActions.updateComment(comment, recruitmentId)),
    recruitMember: (member: UserDto, recruitmentId: string) => dispatch(RecruitmentActions.recruitMember(member, recruitmentId)),
});

export const CommentBoxesView = connect<StateToProps, DispatchProps, any>(
    mapStateToProps, mapDispatchToProps)(CommentBoxComponent);