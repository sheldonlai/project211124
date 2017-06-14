import * as React from "react";
import {Component} from "react";
import FlatButton from "material-ui/FlatButton";
import {Link} from "react-router-dom";
import {Routes} from "../constants/Routes";
import {AuthActions} from "../actions/AuthActions";
import {connect} from "react-redux";

const menuButtonStyle = {
    "height": "50px"
};

const flatButtonStyle = {
    "fontSize": "14px"
};

class MenuClass extends Component<any,any>{
    constructor(props){
        super(props);
    }

    buttons = () => {
        console.log(this.props)
        if (this.props.loggedIn) {
            return (
                <Link to={Routes.login}>
                    <FlatButton label="Login" primary={true} style={menuButtonStyle}
                                labelStyle={flatButtonStyle}/>
                </Link>
            )
        } else {
            return (
                <div>
                    <FlatButton label="Log Out" primary={true} style={menuButtonStyle}
                                labelStyle={flatButtonStyle} onTouchTap={() => {
                        AuthActions.logout()
                    }}/>
                </div>
            )
        }
    };

    render(){
        return (
            <div className="menu">
                <ul>
                    <li>
                        <Link to={Routes.home}>
                            <FlatButton label="Askalot" primary={true} style={menuButtonStyle}
                                        labelStyle={{"fontSize": "20px"}}/>
                        </Link>
                        <Link to={Routes.question}>
                            <FlatButton label="Questions" primary={true} style={menuButtonStyle}
                                        labelStyle={flatButtonStyle}/>
                        </Link>
                    </li>
                </ul>
                <div id="login-menu">
                    {this.buttons()}
                </div>
            </div>
        )
    }
}

export const Menu = connect(
    (state) => ({loggedIn: state.AuthReducer.loggedIn, authStatus : state.AuthReducer.status})
)(MenuClass)