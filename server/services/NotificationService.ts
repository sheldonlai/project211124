import {BaseService} from "./BaseService";
import {Notification} from "../models/Notification";
import {User} from "../models/User";
import {INotificationRepository} from "../repositories/NotificationRepository";
import {AppError} from "../errors/AppError";
import {ClientError} from "../errors/HttpStatus";
import {Types} from "mongoose";
import {NotifiableEntity} from "../models/NotificableEntity";
import {BaseModel} from "../models/Base/BaseModel";

export interface INotificationService {
    create(recipient: User, notifiableEntity: NotifiableEntity): Promise<Notification>;
    getByUser(user: User): Promise<Array<Notification>>;
    getByID(notificationID: Types.ObjectId): Promise<Notification>;
    notificationSeen(user: User, notificationID: Types.ObjectId): Promise<Notification>;
    deleteNotificationByID(user: User, notificationID: Types.ObjectId): Promise<Notification>;
}

export class NotificationService extends BaseService implements INotificationService {
    constructor(private notificationRepository: INotificationRepository) {
        super();
    }

    create(recipient: User, notifiableEntity: NotifiableEntity): Promise<Notification> {
        let newNotification: Notification = new Notification(recipient, notifiableEntity);
        return this.notificationRepository.create(newNotification);
    }

    getByUser(user: User): Promise<Array<Notification>> {
        return this.notificationRepository.getByUser(user);
    }

    async getByID(notificationID: Types.ObjectId): Promise<Notification> {
        return this.notificationRepository.getById(notificationID);
    }

    async notificationSeen(user: User, notificationID: Types.ObjectId): Promise<Notification> {
        let notification: Notification = await this.getByID(notificationID);
        this.checkOwner(user, notification);
        notification.isRead = true;
        return this.notificationRepository.update(notification);
    }

    async deleteNotificationByID(user: User, notificationID: Types.ObjectId) {
        let notification: Notification = await this.getByID(notificationID);
        this.checkOwner(user, notification);
        return this.notificationRepository.deleteById(notificationID);
    }

    private checkOwner(user: User, notification: Notification): void {
        if (BaseModel.hasSameID(user, notification.recipient)) {
            throw new AppError("You are not the owner of this notification!", ClientError.UNAUTHORIZED);
        }
    }

}