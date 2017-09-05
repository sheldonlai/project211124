import {User} from "../models/User";

export const removeUserRestrictedInfo = (user: User) => {
    if (user) {
        delete user.local;
        delete user.email;
        delete user.role;
    }
};
