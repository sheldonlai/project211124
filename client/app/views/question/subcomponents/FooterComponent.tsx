import * as React from "react";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import {ThumbComponent} from "../../../components/Forms/ThumbComponent";

interface props {
    onUpVote: () => void;
    onDownVote: () => void;
    upVotes: number;
    downVotes: number;
    author: UserDto;
    createdUtc: Date;
}

export class FooterComponent extends React.Component<props> {


    render() {
        let question = {
            upVotes: 0
        };
        return (
            <div>
                <ThumbComponent
                    value={this.props.upVotes}
                    thumbUp={true}
                    onClick={this.props.onUpVote} />
                <ThumbComponent
                    value={this.props.downVotes}
                    thumbUp={false}
                    onClick={this.props.onDownVote} />
                <div style={{color: "grey", fontSize: 10, textAlign: "right"}}>
                    {this.props.createdUtc && <div>Posted on {this.props.createdUtc}</div>}
                    <br/>
                    by {this.props.author.username}
                </div>
            </div>
        );
    }
}