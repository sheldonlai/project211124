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

interface StateToProps{
    comments: RecruitmentCommentDto[];
    user: UserDto;
    lastUpdated: number;
    edit: boolean;
}

interface props extends StateToProps, DispatchProps {}

interface state{
    newComment: RecruitmentCommentDto;
    addComment: boolean;
}
const paperStyle = {height: "100%", padding: 5,};
export class CommentBoxComponent extends Component<props, state> {
    constructor(props){
        super();
        let newComment: RecruitmentCommentDto = {
            _id: '',
            request: RecruitmentRequestEnum.NOT_SPECIFIED,
            comment: DraftJsHelper.convertEditorStateToRaw(EditorState.createEmpty()),
            createdBy: props.user,
            createdAt: new Date(Date.now()),
            updatedAt: undefined,
        };
        this.state = {
            newComment: newComment,
            addComment: false,
        }
    }

    updateComment = (field: string, val: any) => {
        let comment = {...this.state.newComment};
        comment[field] = val;
        this.setState({newComment: comment});
    };

    submitComment = () => {

    };

    cancelComment = () => {

    };

    commentEditor = () => {
        return(
            <div>
                <Paper style={paperStyle} elevation={0}>
                    <DropDownSelect
                        placeholder={"Request to join"}
                        data={getDropDownDataFromStringEnum(UserRequestEnum)}
                        onChange={(request) => this.updateComment("request", request)}
                        value={this.state.newComment.request}
                    />
                    <Divider/>
                    <QAEditorComponent value={DraftJsHelper.convertRawToEditorState(this.state.newComment.comment)}
                                       onChange={(content) => this.updateComment("comment", DraftJsHelper.convertEditorStateToRaw(content))}
                                       onSubmit={this.submitComment} readOnly={!this.state.addComment}
                                       style={{fontSize: 14}} reset={this.cancelComment}
                    />
                </Paper>
            </div>
        )
    };

    render(){
        let comments = {...this.props.comments};
        return(
            <div style={{position: "relative"}}>
                <Grid container>
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
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
});

interface DispatchProps{

}

export const CommentBoxesView = connect<StateToProps, DispatchProps, any>(
    mapStateToProps, mapDispatchToProps)(CommentBoxComponent);