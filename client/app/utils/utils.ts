export const listNumericalEnumValues = (enumObj : any) => {
    Object.keys(enumObj).map(k => enumObj[k]).filter(e => typeof e === "number");
}