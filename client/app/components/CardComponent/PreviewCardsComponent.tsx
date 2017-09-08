import * as React from "react";
import {FrontEndQuestionModels} from "../../models/QuestionModels";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;
import {FrontEndStoryModels} from "../../models/StoryModels";
import StoryPreview = FrontEndStoryModels.StoryPreview;
import {
    getLengthFromBoxes, sortListToGetSameWidthEachRow, spliceListByRow,
    WidableObject
} from "../../utils/WideBoxUtils";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import {CustomLink} from "../RoutingComponents/CustomLink";
import {CustomCard} from "./CardComponent";
import {Preview} from "../../models/CommonModels";
import {PRIMARY_COLOR} from "../../views/router";
import Button from "material-ui/Button/Button";

export interface props {
    list: Preview[];
    label: string;
    labelType?: string;
    trim?: boolean; // if there is a non fully populated trim the bottom row
    maxBlock?: number;
    maxRow? : number;
}

interface state {
    width: number;
    height: number;
    row: number;
}

export class PreviewCardsComponent extends React.Component<props, state> {
    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0, row: this.props.maxRow};
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    };

    findOptimalMaxBlock = () => {

    };

    render() {
        const boxWidth = 266;
        const bodyMargin = 16;
        let width = this.state.width;
        let n = Math.floor((width - bodyMargin) / boxWidth);
        n = n > this.props.maxBlock ? this.props.maxBlock : n;
        let list = sortListToGetSameWidthEachRow(this.props.list, n, this.props.trim);
        if (this.props.maxRow)
            list = spliceListByRow(list, n, this.state.row);
        let listLength = getLengthFromBoxes(list);
        // if empty list set listlength to n
        listLength = listLength > 0? listLength : n;

        // determine what the maximum width is used for
        let maxWidth = (n > listLength) ? boxWidth * listLength : n * boxWidth;
        maxWidth += bodyMargin;
        const labelType = this.props.labelType ? this.props.labelType : "display1";
        return (
            <Grid container justify="center">
                {this.props.children &&
                <Grid item style={{marginTop: 16, width: "100%", textAlign: "center"}}>
                    <div style={{width: maxWidth, margin: "auto"}}>
                        {this.props.children}
                    </div>
                </Grid>}
                <Grid item style={{marginTop: 16, width: maxWidth}}>
                    <Typography type={labelType} style={{marginBottom: 10, color: PRIMARY_COLOR}}>
                        {this.props.label}
                    </Typography>
                    {
                        !this.props.list || this.props.list.length === 0 ?
                            <Typography type={'body1'} style={{color: "#898989"}}>
                                There are nothing posted.
                            </Typography> :
                            <div>
                                <Grid container justify="flex-start">
                                    {list.map((e) => (
                                        <Grid item key={e.element.title}>
                                            <div style={{display: "inline-block"}}>
                                                <CustomLink to={e.element.toLink()}>
                                                    <CustomCard
                                                        title={e.element.title}
                                                        authorName={e.element.author.username}
                                                        content={e.element.content}
                                                        date={e.element.createdUtc}
                                                        wide={n > 1 && e.wide}
                                                    />
                                                </CustomLink>
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                                {
                                    this.props.list.length !== list.length &&
                                    <Button
                                        color="primary" style={{width: "100%"}}
                                        onClick={() => this.setState({row : this.state.row + 1})}
                                    >
                                        Show more
                                    </Button>
                                }
                            </div>
                    }
                </Grid>
            </Grid>
        );
    }
}