
import {Types} from 'mongoose';
import {isString} from "util";
export class BaseModel {
    _id : any;

    public static hasSameID(left: string | Types.ObjectId | BaseModel,
                           right: string | Types.ObjectId | BaseModel): boolean {

        function extractIDasString(value: string | Types.ObjectId | BaseModel): string {
            if (isString(value)) {
                return <string>value;
            } else if (value instanceof  Types.ObjectId) {
                return value.toString();
            } else {
                return (<BaseModel>value)._id.toString();
            }
        }

        return extractIDasString(left) == extractIDasString(right);
    }

}