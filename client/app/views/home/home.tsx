import * as React from "react";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {DashboardActions} from "../../actions/DashboardActions";
import {DashboardReducerState} from "../../reducers/DashboardReducer";
import {RouteComponentProps} from "react-router";
import {GridListTile, GridListTileBar} from 'material-ui/GridList';
import {PreviewCardsComponent} from "../../components/CardComponent/PreviewCardsComponent";
import Grid from "material-ui/Grid/Grid";

export class HomeComponent extends React.Component<props, any> {

    componentWillMount() {
        this.props.fetchDashboardData();
    }

    render(){

        return (
            <div>

                <PreviewCardsComponent list={this.props.hot} trim={true}
                                       label={"Popular"} maxBlock={4}>
                    <Grid container>
                        dsfkjsdkfaj
                    </Grid>
                </PreviewCardsComponent>

            </div>
        )
    }

}

interface StateToProps extends DashboardReducerState{

}

interface DispatchToProps {
    fetchDashboardData : () => void;
}

interface props extends StateToProps, DispatchToProps, RouteComponentProps<{}>{

}

const mapStateToProps = (state: AppStoreState): StateToProps => ({
    ...state.dashboard
});

const dispatchToProps = (dispatch) => ({
   fetchDashboardData : () => dispatch(DashboardActions.fetchDashboardAction())
});

export const Home = connect<StateToProps,DispatchToProps, RouteComponentProps<{}>> (
    mapStateToProps,
    dispatchToProps
)(HomeComponent);