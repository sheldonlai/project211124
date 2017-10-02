import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";


interface RecruitmentPageProps extends RouteComponentProps<{id: string}>{}

export class RecruitmentPageComponent extends React.Component<RecruitmentPageProps>{
    constructor(props){
        super();
    }
}

export const RecruitmentPageview = connect <RouteComponentProps<{id: string}>>(
    (state: AppStoreState) => {
    }
);