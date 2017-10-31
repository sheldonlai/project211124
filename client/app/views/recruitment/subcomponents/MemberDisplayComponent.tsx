import * as React from "react";
import {Component} from "react";
import Paper from "material-ui/Paper";
import {connect} from "react-redux";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import Grid from "material-ui/Grid";
import {AuthorLink} from "../../../components/RoutingComponents/AuthorLink";
import Typography from "material-ui/Typography";

interface props{
    members: UserDto[]
}

let paperStyle = {height: "100%", padding: 5};

export class MembersDisplayComponent extends Component<props, {}>{
    constructor(props){
        super(props);
    }

    renderMember(user: UserDto){
        return(
            <div>
                <Paper style={paperStyle} elevation={1}>
                    <Grid container justify="flex-start">
                        <Grid item>
                            <AuthorLink fontSize={12} key={user._id} username={user.username}/>
                            {user.company &&
                            <Typography type="caption"> from {user.company}</Typography>
                            }
                            {!user.company && user.university &&
                            <Typography type="caption"> from {user.university.name}</Typography>
                            }
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }

    render(){
        return(
            <div>
                <Grid container spacing={8} direction="column">
                    {this.props.members.map(member => {
                        return(
                            <Grid item key={member._id}>
                                {this.renderMember(member)}
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        )
    }
}

export const MembersViewComponent = MembersDisplayComponent;