import * as React from "react";
import AnimatedWrapper from "../../components/Animations/AnimatedWrapper";

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