import * as React from "react";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {DashboardActions} from "../../actions/DashboardActions";
import {DashboardReducerState} from "../../reducers/DashboardReducer";
import {RouteComponentProps} from "react-router";
import {GridListTile, GridListTileBar} from 'material-ui/GridList';
import {PreviewCardsComponent} from "../../components/CardComponent/PreviewCardsComponent";

export class HomeComponent extends React.Component<props, any> {

    componentWillMount() {
        this.props.fetchDashboardData();
    }

    render(){

        return (
            <div>
                <PreviewCardsComponent list={this.props.questions.concat(this.props.stories as any)} label={"Hottest Question"} maxBlock={4} />
                {/*<GridList cellHeight={200} spacing={1}>*/}
                    {/*{this.props.questions.map(tile => (*/}
                        {/*<GridListTile key={tile._id} cols={isElementWide(tile) ? 2 : 1} rows={isElementWide(tile)? 2 : 1}>*/}

                            {/*<GridListTileBar*/}
                                {/*title={tile.title}*/}
                                {/*titlePosition="top"*/}
                            {/*/>*/}

                        {/*</GridListTile>*/}
                    {/*))}*/}
                {/*</GridList>*/}
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