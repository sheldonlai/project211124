const wordsThreshold = 200;

export const isElementWide = (element : any) => {
    return element.content && element.content.length > wordsThreshold
};

const swapElement =(list: any[], i: number, j: number) => {
    let temp = list[i];
    list[i] = list[j];
    list[j] = temp;
}

const findSlimBoxFrom = (list: any[],index? : number) => {
    index = index? index: 0;
    for (index; index < list.length; index++){
        if (!isElementWide(list[index])){
            return index;
        }
    }
    return -1;
};

const findSlimBoxFromReverse = (list: any[],index? : number, stopIndex?: number) => {
    index = index? index: 0;
    for (index; index > 0 || index > stopIndex; index--){
        if (!isElementWide(list[index])){
            return index;
        }
    }
    return -1;
};
export const sortListToGetSameWidthEachRow = (list: any[], numOfBoxPerRow: number, trim?: boolean) => {
    let rList = [...list];
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
            if (isElementWide(rList[j])){
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

                            // increment length
                            length += 2;
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