import * as React from "react";
import {Route} from "react-router";
import {Routes} from "../../constants/Routes";
import {AdminDashboardView} from "./AdminDashboard";

const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};

export const AdminRouter = () => (
    <div>
        <Route path={Routes.admin} component={AdminDashboardView}/>
    </div>
);

export default AdminRouter;