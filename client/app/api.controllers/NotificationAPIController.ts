import {ApiController} from "./ApiController";
import {APIUrls} from "../../../server/urls";
import {FrontEndNotificationModels} from "../models/NotificationModels";
import NotificationObj = FrontEndNotificationModels.NotificationObj;

class NotificationAPIControllerClass extends ApiController{
    fetchNotificationsByUser(): Promise<NotificationObj[]> {
        return this.get(APIUrls.getNotificationsByUser).then(res => {
            return res.data.map(dto => NotificationObj.fromDto(dto));
        });
    }

    markNotificationAsSeen (notificationId : string): Promise<void> {
        return this.put(APIUrls.notificationSeen.replace(":id", notificationId)).then(res =>{
            return;
        });
    }

    deleteNotification(notificationId: string) {
        return this.delete(APIUrls.deleteNotification.replace(":id", notificationId));
    }

}


export const NotificationAPIController = new NotificationAPIControllerClass();