import * as React from "react";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import {ThumbComponent} from "../../../components/Forms/ThumbComponent";
import Grid from "material-ui/Grid";
import {convertDateTimeToString} from "../../../utils/DateUtils";
import {FooterComponent} from "../../../components/Footer/FooterComponent";
interface props {
    author: UserDto;
    createdUtc: Date;
    views?: number;
    onUpVote?: () => void;
    onDownVote?: () => void;
    upVotes?: number;
    downVotes?: number;
}

export class QuestionFooterComponent extends React.Component<props> {


    render() {
        let question = {
            upVotes: 0
        };
        return (
            <div>
                <Grid container>
                    <Grid item xs={6}>
                        {this.props.upVotes &&
                        <ThumbComponent
                            value={this.props.upVotes}
                            thumbUp={true}
                            onClick={this.props.onUpVote} />
                        }
                        {this.props.downVotes &&
                        <ThumbComponent
                            value={this.props.downVotes}
                            thumbUp={false}
                            onClick={this.props.onDownVote} />
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <FooterComponent by={this.props.author.username} date={this.props.createdUtc}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}