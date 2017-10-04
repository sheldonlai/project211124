import {UserDto} from "../auth/UserDto";
import {NotifiableEntity} from "../../models/NotificableEntity";

export interface NotificationDto {
    _id : string;
    recipient: UserDto;
    notifiableEntity: NotifiableEntity;
    notifiableEntityType: string;
    isRead: boolean;
    sendAt: Date;

}