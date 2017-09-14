import {ApiController} from "./ApiController";
import {APIUrls} from "../../../server/urls";

class NotificationAPIControllerClass extends ApiController{
    fetchNotifications () {
        return this.get(APIUrls.NotificationFetch);
    }
}


export const NotificationAPIController = new NotificationAPIControllerClass();