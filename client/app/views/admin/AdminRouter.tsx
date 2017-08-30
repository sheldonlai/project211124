import * as React from "react";
import {Route} from "react-router";
import {Routes} from "../../constants/Routes";
import {AdminMenuView} from "./AdminMenu";
import {AdminDashboardComp} from "./dashboard/AdminDashboard";

const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};

export const AdminRouter = () => (
    <div>
        <Route path={Routes.admin} component={AdminMenuView}/>
        <Route path={Routes.admin_dashboard} component={AdminDashboardComp}/>
    </div>
);

export default AdminRouter;