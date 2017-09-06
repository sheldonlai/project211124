import {User} from "../models/User";

// used when accessing profile that isn't yours
export const removeUserRestrictedInfo = (user: User) => {
    if (user) {
        delete user.local;
        delete user.email;
        delete user.role;
    }
};
