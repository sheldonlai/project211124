import * as React from "react";
import {isElementWide, sortListToGetSameWidthEachRow} from "../../../utils/WideBoxUtils";
import Typography from "material-ui/Typography";
import {CustomLink} from "../../../components/CustomLink";
import {CustomCard} from "../../../components/CardComponent/CardComponent";
import {Routes} from "../../../constants/Routes";
import Grid from "material-ui/Grid";
import {FrontEndStoryModels} from "../../../models/StoryModels";
import StoryPreview = FrontEndStoryModels.StoryPreview;

interface state {
    height: number;
    width: number;
}

interface props {
    list : StoryPreview[];
    label: string;
    maxWidth? : number;
    trim?: boolean;
}

export class StoryPreviews extends React.Component<props, state> {

    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0};
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

    render() {
        if (!this.props.list) return undefined;
        const bodyMargin = 16;
        let width = this.state.width;
        width = this.props.maxWidth && width > this.props.maxWidth ? this.props.maxWidth : width;
        let n = Math.floor((width - bodyMargin) / (250 + 16));
        let list = sortListToGetSameWidthEachRow(this.props.list, n, this.props.trim);
        return (
            <div style={{marginTop: 16}}>
                <Typography type="display2" style={{margin: "20px 20px 10px 20px"}}>{this.props.label}</Typography>
                <Grid container justify="center">
                    {list.map((e: StoryPreview) => (
                        <Grid item key={e.title}>
                            <div style={{display: "inline-block"}}>
                                <CustomLink to={Routes.question_by_id.replace(':id', e._id)}>
                                    <CustomCard
                                        title={e.title}
                                        content={e.content.getCurrentContent().getPlainText()}
                                        date={e.createdAt}
                                        wide={n > 1 && isElementWide(e)}
                                    />
                                </CustomLink>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}