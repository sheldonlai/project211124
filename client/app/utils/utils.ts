import {CSSProperties} from "react";
export const listNumericalEnumValues = (enumObj : any) => {
    Object.keys(enumObj).map(k => enumObj[k]).filter(e => typeof e === "number");
};

export const applyStylesToDefaultStyle = (defaultStyle: CSSProperties, dictionary: CSSProperties) : CSSProperties => {
    if (dictionary) {
        let keys = Object.keys(dictionary);
        for (let key of keys) {
            defaultStyle[key] = dictionary[key];
        }
    }
    return defaultStyle;
};

export const mapFieldsOnToObject = (object: any, fields: any) : any => {
    if (fields) {
        let keys = Object.keys(fields);
        for (let key of keys) {
            object[key] = fields[key];
        }
    }
    return object;
};