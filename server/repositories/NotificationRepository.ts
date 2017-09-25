import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {INotification, Notification, NotificationModel} from "../models/Notification";
import {User} from "../models/User";

export interface INotificationRepository extends IBaseRepository<Notification> {
    getByUser(user: User): Promise<Array<Notification>>
}

export class NotificationRepository
    extends BaseRepository<Notification, INotification>
    implements INotificationRepository {

    constructor() {
        super(NotificationModel);
    }

    getByUser(user: User): Promise<Array<Notification>> {
        return this.filter({ recipient: user._id } );
    }

    applyAdditionalFunction(n: Notification) {
        return Notification.fromObject(n);
    }

}