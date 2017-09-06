import {ApiController} from "./ApiController";
import {APIUrls} from "../../../server/urls";

class ProfileApiControllerClass extends ApiController{
    fetchProfilePage (username: string) {
        return this.get(APIUrls.getProfile.replace(":username", username));
    }
}

export const ProfileApiController = new ProfileApiControllerClass();