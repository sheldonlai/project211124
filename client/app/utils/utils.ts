import {CSSProperties} from "react";
import {DropDownSelectData} from "../components/Forms/DropDownSelect";
import {UniversityYearEnum} from "../../../server/enums/UniversityYearEnum";
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

export const getExpectedYearEnum = (e: UniversityYearEnum, date: Date| string):UniversityYearEnum  => {
    if (e === UniversityYearEnum.GRADUATE_STUDIES || e === UniversityYearEnum.GRADUATED){
        return e;
    }
    if (typeof date === "string"){
        date = new Date(date);
    }

    let regSchoolYear = getSchoolYear(date);
    let thisSchoolYear = getSchoolYear(new Date());
    let difference = thisSchoolYear - regSchoolYear;
    let index = e + difference >= 4 ? UniversityYearEnum.GRADUATED : e + difference;
    console.log(index)
    let en = UniversityYearEnum[UniversityYearEnum[index]];
    console.log(en)
    return en;
};

const getSchoolYear = function (date: Date): number {
    let schoolYear;
    if (date.getMonth() >= 8){
        schoolYear = date.getFullYear()
    } else {
        schoolYear = date.getFullYear() - 1
    }
    return schoolYear;
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





