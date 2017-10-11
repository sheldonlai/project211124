import {UserDto} from "../../../server/dtos/auth/UserDto";
import {NotificationDto} from "../../../server/dtos/notification/NotificationDto";

export namespace FrontEndNotificationModels {
    export class NotificationObj implements NotificationDto{
        _id: string;
        recipient: UserDto;
        notifiableEntity: any;
        notifiableEntityType: string;
        seen: boolean;
        sendAt: Date;

        static fromDto(dto: NotificationDto) : NotificationObj {
            let object = new NotificationObj();
            for ( let key of Object.keys(dto)) {
                object[key] = dto[key];
            }
            return object;
        }

    }
}