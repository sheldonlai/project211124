import * as React from "react";
import {connect} from "react-redux";
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Icon from 'material-ui/Icon';
import {AppStoreState} from "../../stores/AppStore";

interface state {
    page: number;
}

class AdminDashboard extends React.Component<any, state>{

    constructor(props){
        super(props);
        this.state = {
            page: 0
        };
        console.log(this.props.user)
    }

    handleChange = (event, v: number) => {
        console.log(v);
        switch (v) {
        }
        this.setState({page: v});
    };

    render() {
        return <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={this.state.page}
                    onChange={this.handleChange}
                    scrollable
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Dashboard" icon={<Icon>dashboard</Icon>} />
                    <Tab label="Teammate" icon={<Icon>people</Icon>} />
                </Tabs>
            </AppBar>
        </div>
    }
}

export const AdminDashboardView = connect(
    (state: AppStoreState) => ({user: state.auth.user})
)(AdminDashboard);