import * as React from "react";
import {match, Route} from "react-router";
import {Link} from "react-router-dom";
import AnimatedWrapper from "../../components/AnimatedWrapper";

export class HomeComponent extends React.Component<any, any> {

    render(){
        return (
            <div>
                <h4>This is home page</h4>
            </div>
        )
    }

}

export const Home = AnimatedWrapper(HomeComponent);