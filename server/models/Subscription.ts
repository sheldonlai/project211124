import {Document, model, Schema, Types} from "mongoose";
import {User} from "./User";
import {BaseModel} from "./Base/BaseModel";
import {NotifiableEntity} from "./NotificableEntity";

export class Subscription extends BaseModel {
    subscriber: Types.ObjectId | User;
    subscribee: Types.ObjectId | NotifiableEntity;
    subscribeeType: string; // To avoid duplicate ObjectId
    subscribedAt: Date;

    constructor(subscriber: Types.ObjectId | User,
                subscribeeId: Types.ObjectId,
                subscribeeType: string
    ){
        super();
        this.subscriber = subscriber;
        this.subscribee = subscribeeId;
        this.subscribeeType = subscribeeType;
        this.subscribedAt = new Date()
    }
}

export interface ISubscription extends Subscription, Document {}

const schema = new Schema({
    subscriber:     {type: Schema.Types.ObjectId, ref: 'user', required: true},
    subscribee:     {type: Schema.Types.ObjectId, ref: 'subscription.subscribeeType', required: true},
    subscribeeType: {type: String, required: true },
    subscribedAt:   {type: Date, default: Date.now, required: true }
});

const autoPopulateUsers = function(next) {
    this.populate(["subscriber"]);
    next();
};

schema.pre('findOne', autoPopulateUsers)
      .pre('find', autoPopulateUsers);

export const SubscriptionModel = model<ISubscription>('subscription', schema);

