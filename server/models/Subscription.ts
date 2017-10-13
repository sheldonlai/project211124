import {Document, model, Schema, Types} from "mongoose";
import {User} from "./User";
import {BaseModel} from "./Base/BaseModel";
import {NotifiableEntity} from "./NotificableEntity";
import {createModelFromObject} from "../utils/ModelUtils";

export class Subscription extends BaseModel {
    subscriber: Types.ObjectId | User;
    subscribeTo: Types.ObjectId | NotifiableEntity;
    subscribeToType: string; // To avoid duplicate ObjectId
    subscribedAt: Date;

    constructor(subscriber: Types.ObjectId | User,
                subscribeeId: Types.ObjectId,
                subscribeeType: string
    ){
        super();
        this.subscriber = subscriber;
        this.subscribeTo = subscribeeId;
        this.subscribeToType = subscribeeType;
        this.subscribedAt = new Date()
    }

    static fromObject (obj:any): Subscription {
        return createModelFromObject<Subscription>(Subscription, obj);
    }
}

export interface ISubscription extends Subscription, Document {}

const schema = new Schema({
    subscriber:     {type: Schema.Types.ObjectId, ref: 'user', required: true},
    subscribeTo:     {type: Schema.Types.ObjectId, ref: 'subscription.subscribeToType', required: true},
    subscribeToType: {type: String, required: true },
    subscribedAt:   {type: Date, default: Date.now, required: true }
});

const autoPopulateUsers = function(next) {
    this.populate(["subscriber"]);
    next();
};

schema.pre('findOne', autoPopulateUsers)
      .pre('find', autoPopulateUsers);

export const SubscriptionModel = model<ISubscription>('subscription', schema);

