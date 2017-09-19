import {Types} from "mongoose";
import {User} from "./User";

/* Implementing this interface means when an object of that class
   is created or updated, it should notify the subscribers.
 */
export interface NotifiableEntity {
    /* The object Id of the document */
    getID(): Types.ObjectId;

    /* The model name of the corresponding moogoose model */
    getType(): string;

    // need to pass in "reason" enum. e.g: delete, update etc
    buildMessage(recipient: User): string;
}