import {CSSProperties} from "react";
import {DropDownSelectData} from "../components/Forms/DropDownSelect";
export const listNumericalEnumValues = (enumObj : any): number[] => {
    return Object.keys(enumObj).map(k => enumObj[k]).filter(e => typeof e === "number");
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

export const convertEnumStringToViewString = (key: string) => {
    let str = key.replace(/_/g, " ").toLocaleLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1)
};

export const getDropDownDataFromStringEnum = (enumClass): DropDownSelectData[] => {
    return Object.keys(enumClass).map(key => (
        {value: key, text: convertEnumStringToViewString(key)}
    ));
};

export const getDropDownDataFromNumericalEnum = (enumClass: any) => {
    return listNumericalEnumValues(enumClass).map((key) => {
        return {
            value: key,
            text: convertEnumStringToViewString(enumClass[key])
        }
    })
};


export const arrayFind  = function(predicate) {
    // 1. Let O be ? ToObject(this value).
    if (this == null) {
        throw new TypeError('"this" is null or not defined');
    }

    var o = Object(this);

    // 2. Let len be ? ToLength(? Get(O, "length")).
    var len = o.length >>> 0;

    // 3. If IsCallable(predicate) is false, throw a TypeError exception.
    if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
    }

    // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
    var thisArg = arguments[1];

    // 5. Let k be 0.
    var k = 0;

    // 6. Repeat, while k < len
    while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
            return kValue;
        }
        // e. Increase k by 1.
        k++;
    }

    // 7. Return undefined.
    return undefined;
}


