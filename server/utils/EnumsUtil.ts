
export const listNumericalEnumValues = (enumObj : any): number[] => {
    return Object.keys(enumObj).map(k => enumObj[k]).filter(e => typeof e === "number");
};