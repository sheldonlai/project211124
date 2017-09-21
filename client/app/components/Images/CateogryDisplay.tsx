import * as React from "react";
import {CategoryTypeEnum} from "../../../../server/enums/CategoryTypeEnum";
import Icon from "material-ui/Icon/Icon";
import Typography from "material-ui/Typography/Typography";
import {blueGrey, cyan, deepOrange, lightGreen, lightWhite, pink, red, teal} from "material-ui/colors";
import {PRIMARY_COLOR} from "../../views/router";

interface props {
    category: CategoryTypeEnum;
    height: number;
    hover? : boolean;

}

export class CategoryDisplay extends React.Component<props> {

    renderNotSpecified = () => {
        return <Typography type="display1" style={{
            fontSize: 200, height: "100%", lineHeight: "100%", textAlign: "center", width: "100%",
            opacity: this.props.hover? 0.6: 1, backgroundColor: deepOrange[400], color: "#efefef"
        }}>
            ?
        </Typography>
    };

    renderIcon = (icon: string, fontColor?: string, backgroundColor?: string) => {
        return <Icon style={{
            fontSize: 180, height: "100%", lineHeight: "100%", textAlign: "center", width: "100%", color: fontColor,
            backgroundColor: backgroundColor, opacity: this.props.hover? 0.6: 1
        }} color="action">
            {icon}
        </Icon>
    };

    render() {
        switch (this.props.category) {
            case undefined:
                return undefined;
            case CategoryTypeEnum.COMPUTER_SCIENCE:
                return this.renderIcon("computer", blueGrey[800], blueGrey['A200']);
            case CategoryTypeEnum.ARTS:
                return this.renderIcon("color lens");
            case CategoryTypeEnum.ENTERTAINMENT:
                return this.renderIcon("live_tv",  teal[800] , teal[100]);
            case CategoryTypeEnum.HISTORY:
                return this.renderIcon("history");
            case CategoryTypeEnum.LANGUAGES:
                return this.renderIcon("translate", cyan[900], cyan[100]);
            case CategoryTypeEnum.SCIENCE:
                return this.renderIcon("language");
            case CategoryTypeEnum.LIFE_STYLE:
                return this.renderIcon("directions_run");
            default:
                return this.renderNotSpecified();
        }


    }

}