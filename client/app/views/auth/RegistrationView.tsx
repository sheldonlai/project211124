import * as React from "react";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import {SplitVIewTemplate} from "../../components/Templates/SplitVIewTemplate";
import Button from "material-ui/Button";
import {TermsAndCondition} from "./TermsAndCondition";
import Checkbox from 'material-ui/Checkbox';
import Typography from "material-ui/Typography";
import {FormGroup, FormControlLabel} from 'material-ui/Form';
import {RegistrationForm} from "./RegistrationForm";

enum PageEnum {
    terms_and_conditions,
    form,
    confirmation
}

interface state {
    page: PageEnum;
    agree: boolean;
}

export class RegistrationViewComp extends React.Component<stateToProps> {
    state = {
        page: PageEnum.terms_and_conditions,
        agree: false
    };

    nextOnTermsAndCondition = () => {
        if (this.state.agree == false){
            alert("You have to agree to the terms of services to process")
        } else {
            this.setState({page: PageEnum.form})
        }
    };

    getPage() {
        if (this.state.page === PageEnum.terms_and_conditions) {
            return <div>
                <TermsAndCondition/>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.agree}
                            onChange={() => this.setState({agree: !this.state.agree})}/>
                    }
                    label="by checking this box I agree with the terms above"
                />
                <Button raised color="primary" onClick={this.nextOnTermsAndCondition}>Next</Button>
            </div>
        } else {
            return <RegistrationForm loggedIn={this.props.loggedIn}/>;
        }
    }


    render() {
        return (
            <SplitVIewTemplate>

                <Paper style={{textAlign: "center", padding: 20, margin: 20}}>
                    {this.getPage()}

                </Paper>
                <div/>
            </SplitVIewTemplate>
        )
    }
}

interface stateToProps {
    loggedIn: boolean;
}

const mapStateToProps = (state: AppStoreState): stateToProps => ({
    loggedIn: state.auth.loggedIn
});

export const RegistrationView = connect<stateToProps, any, any>(
    mapStateToProps
)(RegistrationViewComp);

