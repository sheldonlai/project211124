import * as React from "react";
import AnimatedWrapper from "../../components/AnimatedWrapper";
import {FileUploader} from "../../components/FileUploader/FileUploader";
import {DropDownSelect} from "../../components/DropDownSelect";

export class HomeComponent extends React.Component<any, any> {

    render(){
        return (
            <div>
                <h4>This is home page</h4>
                <FileUploader />
                <DropDownSelect data={[
                    {text: "test", value: 1},
                    {text: "okay", value: 2}
                ]} />
            </div>
        )
    }

}

export const Home = AnimatedWrapper(HomeComponent);