import {FrontEndStoryModels} from "../models/StoryModels";
import Story = FrontEndStoryModels.Story;
import {FrontEndQuestionModels} from "../models/QuestionModels";
import Question = FrontEndQuestionModels.Question;
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;
import StoryPreview = FrontEndStoryModels.StoryPreview;

const charThreshold = 40;

export const isElementWide = (element : QuestionPreview|StoryPreview) => {
    return element.title && element.title.length > charThreshold
};



const swapElement =(list: WidableObject[], i: number, j: number) => {
    let temp = list[i];
    list[i] = list[j];
    list[j] = temp;
};

const findSlimBoxFrom = (list: WidableObject[],index? : number) => {
    index = index? index: 0;
    for (index; index < list.length; index++){
        if (!list[index].wide){
            return index;
        }
    }
    return -1;
};

const findSlimBoxFromReverse = (list: WidableObject[],index? : number, stopIndex?: number) => {
    index = index? index: 0;
    for (index; index > 0 || index > stopIndex; index--){
        if (!list[index].wide){
            return index;
        }
    }
    return -1;
};

export const getLengthFromBoxes = (list: (WidableObject)[]) => {
    let length = 0;
    for (let el of list){
        length += el.wide? 2 : 1;
    }
    return length;
};

export interface WidableObject {
    wide: boolean;
    element: any;
}

export const spliceListByRow = (list: WidableObject[], numOfBoxPerRow: number, maxRow: number) => {
    let length = 0;
    let i = 0;
    for (i; i < list.length; i ++){
        if (length / numOfBoxPerRow === maxRow){
            break;
        }
        length += numOfBoxPerRow !== 1 && list[i].wide? 2 : 1;
    }
    list = list.splice(0, i);
    return list;
};

export const sortListToGetSameWidthEachRow = (list: any[], numOfBoxPerRow: number, trim?: boolean) :WidableObject[] => {
    let rList : WidableObject[] = list.map(e => ({wide: isElementWide(e), element: e}));
    if (numOfBoxPerRow <= 1){
        return rList;
    }
    let j = 0;
    let i = 0;
    while (i < rList.length){
        let length = 0;
        j = i;
        while(j < rList.length && j < i + numOfBoxPerRow && length < numOfBoxPerRow){
            // see if element is wide if not just add one to length and continue
            if (rList[j].wide){
                // check if the element can fit into the row
                if (length + 2 > numOfBoxPerRow) {
                    let nextSlim = findSlimBoxFrom(rList, j+ 1);
                    if (nextSlim === -1){
                        // no slim elements available after the current wide one
                        // swap the ones from this row before the current index
                        let prevSlim = findSlimBoxFromReverse(rList, j - 1, i);
                        if (prevSlim !== -1){
                            // if there is a slim in the same row but in front the current wide element in the same row
                            // swap the wide element with the found slim element
                            swapElement(rList, prevSlim, j);
                            // increment length
                            length++;
                        } else {
                            // all elements are wide ?
                            // wut to do?!?!
                            // find two slim one in front to replace this
                            rList[j].wide = false;
                            // increment length
                            length ++;
                        }
                    } else {
                        // if there is a slim element after the wide element swap with that
                        swapElement(rList, nextSlim, j);
                        // increment length
                        length++;
                    }

                } else {
                    // the wide element can fit
                    length += 2;
                }
            } else {
                // element is slim
                length ++;
            }
            j ++;
        }
        if (j === rList.length && length !== numOfBoxPerRow && trim){
            rList.splice(i);
        }
        i += j - i;
    }
    return rList;
};