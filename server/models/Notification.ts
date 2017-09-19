import {Document, model, Schema, Types} from "mongoose";
import {User} from "./User";
import {BaseModel} from "./Base/BaseModel";
import {NotifiableEntity} from "./NotificableEntity";

export class Notification extends BaseModel {
    recipient: Types.ObjectId | User;
    notifiableEntity: Types.ObjectId | NotifiableEntity;
    notifiableEntityType: string;
    isRead: boolean;
    sendAt: Date;

    constructor(
        recipient: User,
        notifiableEntity: NotifiableEntity,
    ){
        super();
        this.recipient = recipient;
        this.notifiableEntity = notifiableEntity;
        this.notifiableEntityType = notifiableEntity.getType();
        this.isRead = false;
        this.sendAt = new Date;
    }

    getMessage(): string {
        return (<NotifiableEntity>this.notifiableEntity).buildMessage(<User>this.recipient);
    }
}

export interface INotification extends Notification, Document {}

const schema = new Schema({
    recipient:        {type: Schema.Types.ObjectId, ref: 'user', required: true},
    notifiableEntity: {type: Schema.Types.ObjectId, ref: 'subscription.subscribeeType', required: true},
    subscribeeType:   {type: String, required: true },
    isRead:           {type: Boolean, required: true},
    sendAt:           {type: Date, default: Date.now, required: true }
});

export const NotificationModel = model<INotification>('notification', schema);