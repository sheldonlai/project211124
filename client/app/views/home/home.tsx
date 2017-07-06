import * as React from "react";
import AnimatedWrapper from "../../components/AnimatedWrapper";
import {FileUploader} from "../../components/FileUploader/FileUploader";

export class HomeComponent extends React.Component<any, any> {

    render(){
        return (
            <div>
                <h4>This is home page</h4>
                <FileUploader />
            </div>
        )
    }

}

export const Home = AnimatedWrapper(HomeComponent);