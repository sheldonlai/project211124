import * as React from "react";
import {FrontEndQuestionModels} from "../../../models/QuestionModels";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;
import {CustomLink} from "../../../components/CustomLink";
import {CustomCard} from "../../../components/CardComponent/CardComponent";
import {Routes} from "../../../constants/Routes";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

export interface QuestionPreviewCardsComponentProps {
    list: QuestionPreview[];
    label: string;
    trim?: boolean; // if there is a non fully populated trim the bottom row
    maxWidth?: number;
}
interface state {
    width: number; height: number;
}
export class QuestionPreviewCardsComponent extends React.Component<QuestionPreviewCardsComponentProps, state> {

    wordsThreashold = 200;

    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight});
    };

    reorderList = (numOfBox: number) => {
        let list = [...this.props.list];
        if (numOfBox <= 1){
            return list;
        }
        let j = 0;
        let i = 0;
        while (i < list.length){
            let length = 0;
            j = i;
            while(j < list.length && j < i + numOfBox && length < numOfBox){

                if (this.isElementWide(list[j])){
                    if (length + 2 > numOfBox) {
                        let nextSlim = this.findSlimBoxFrom(list, j+ 1);
                        if (nextSlim === -1){
                            // no slim elements available after the current wide one
                            // swap the ones from this row before the current index
                            let prevSlim = this.findSlimBoxFromReverse(list, j - 1, i);
                            if (prevSlim !== -1){
                                // if there a slim in the same row but in front the current wide element
                                this.swapElement(list, prevSlim, j);
                            }
                        } else {
                            this.swapElement(list, nextSlim, j);

                        }
                        length++;
                    } else {
                        length += 2;
                    }

                } else {
                    length ++;
                }
                j ++;
            }
            if (j === list.length && length !== numOfBox && this.props.trim){
                list.splice(i);
            }
            i += j - i;
        }
        return list;
    };

    isElementWide = (element : QuestionPreview) => {
        return element.content && element.content.length > this.wordsThreashold
    };

    swapElement(list: any[], i: number, j: number) {
        let temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }

    findSlimBoxFrom = (list: QuestionPreview[],index? : number) => {
        index = index? index: 0;
        for (index; index < list.length; index++){
            if (!this.isElementWide(list[index])){
                return index;
            }
        }
        return -1;
    };

    findSlimBoxFromReverse = (list: QuestionPreview[],index? : number, stopIndex?: number) => {
        index = index? index: 0;
        for (index; index > 0 || index > stopIndex; index--){
            if (!this.isElementWide(list[index])){
                return index;
            }
        }
        return -1;
    };

    render() {
        if (!this.props.list) return undefined;
        const bodyMargin = 16;
        let width = this.state.width;
        width = this.props.maxWidth && width > this.props.maxWidth? this.props.maxWidth: width;
        let n = Math.floor((width - bodyMargin) / (250 + 16));
        let list = this.reorderList(n);
        return (
            <div style={{marginTop: 16}}>
                <Typography type="display2" style={{margin: "20px 20px 10px 20px"}}>{this.props.label}</Typography>
                <Grid container justify="center">
                    {list.map((e: QuestionPreview) => (
                        <Grid item key={e.title}>
                            <div style={{display: "inline-block"}}>
                                <CustomLink to={Routes.question_by_id.replace(':id', e._id)}>
                                    <CustomCard
                                        title={e.title}
                                        content={e.content}
                                        date={e.createdUtc}
                                        wide={n > 1 && this.isElementWide(e)}
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