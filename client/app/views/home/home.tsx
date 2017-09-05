import * as React from "react";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {DashboardActions} from "../../actions/DashboardActions";
import {DashboardReducerState} from "../../reducers/DashboardReducer";
import {RouteComponentProps} from "react-router";
import {GridListTile, GridListTileBar} from 'material-ui/GridList';
import {PreviewCardsComponent} from "../../components/CardComponent/PreviewCardsComponent";
import Grid from "material-ui/Grid/Grid";
import Typography from "material-ui/Typography/Typography";
import {PRIMARY_COLOR} from "../router";
import Icon from "material-ui/Icon/Icon";

export class HomeComponent extends React.Component<props, any> {

    componentWillMount() {
        this.props.fetchDashboardData();
    }

    render(){

        return (
            <div>

                <PreviewCardsComponent list={this.props.hot} trim={true}
                                       label={"Popular"} maxBlock={4}>
                    <Grid container style={{width: "100%", height: "100%"}}>
                        <Grid item xs={12}>
                            <Typography type="display1" style={{color: PRIMARY_COLOR}}>
                                The site is currently under development
                            </Typography>
                            <Grid container>
                                <Grid item>
                                    <Icon color="action" style={{fontSize: 120}}>build</Icon>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography type="body1">
                                        The site is currently under development, many of the features may change.
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Grid>
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