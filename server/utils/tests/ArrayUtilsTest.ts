import {getUniqueArray} from "../ArrayUtils";
test('Array utils test', () => {
    let array = [1, 2, 34, 234, 3243, 4, 231, 231];
    let uniqueArray = getUniqueArray(array);
    expect(uniqueArray).not.toEqual(array);
    expect(uniqueArray.length).toBe(array.length - 1);
});