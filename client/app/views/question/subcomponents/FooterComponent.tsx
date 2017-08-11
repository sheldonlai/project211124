import * as React from "react";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import {ThumbComponent} from "../../../components/Forms/ThumbComponent";
import Grid from "material-ui/Grid";
interface props {
    onUpVote: () => void;
    onDownVote: () => void;
    upVotes: number;
    downVotes: number;
    author: UserDto;
    createdUtc: Date;
    views?: number;
}

export class FooterComponent extends React.Component<props> {


    render() {
        let question = {
            upVotes: 0
        };
        return (
            <div>
                <Grid container>
                    <Grid item xs={6}>
                        <ThumbComponent
                            value={this.props.upVotes}
                            thumbUp={true}
                            onClick={this.props.onUpVote} />
                        <ThumbComponent
                            value={this.props.downVotes}
                            thumbUp={false}
                            onClick={this.props.onDownVote} />
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{color: "grey", fontSize: 10, textAlign: "right"}}>
                            <br/>
                            {this.props.createdUtc && <div>Posted on {this.props.createdUtc}</div>}
                            <br/>
                            <div>by {this.props.author.username}</div>
                            <br/>
                            {this.props.views && <div>views : {this.props.views}</div>}
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}