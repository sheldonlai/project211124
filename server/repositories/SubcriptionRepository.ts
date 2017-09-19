import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {ISubscription, Subscription, SubscriptionModel} from "../models/Subscription";
import {User} from "../models/User";
import {Schema, Types} from "mongoose";
import {isNullOrUndefined} from "util";

export interface ISubscriptionRepository extends IBaseRepository<Subscription> {
    subscriptionExists(subscriber: User, subscribeeId: Types.ObjectId, subscribeeType: string): Promise<boolean>;
    getSubscribers(subscribeeId: Types.ObjectId, subscribeeType: string): Promise<Array<Subscription>>;
    getSubscribees(subscriber: User, subscribeeType?: string): Promise<Array<Subscription>>
}

export class SubscriptionRepository
    extends BaseRepository<Subscription, ISubscription>
    implements ISubscriptionRepository {

    constructor() {
        super(SubscriptionModel);
    }

    subscriptionExists(subscriber: User, subscribeeId: Types.ObjectId, subscribeeType: string): Promise<boolean> {
        let query: Object = {
            subscriber: subscriber._id,
            subscribee: subscribeeId,
            subscribeeType: subscribeeType
        };
        return this.exists(query);
    }

    getSubscribers(subscribeeId: Types.ObjectId, subscribeeType: string): Promise<Array<Subscription>> {
        let query: Object = {subscribee: subscribeeId, subscribeeType: subscribeeType };
        return this.filter(query);
    }

    getSubscribees(subscriber: User, subscribeeType?: string): Promise<Array<Subscription>> {
        let query: Object;
        if(isNullOrUndefined(subscribeeType)) {
            query = {subscriber: subscriber._id};
        } else {
            query = {subscriber: subscriber._id, subscribeeType: subscribeeType};
        }
        return this.filter(query);
    }

    protected applyRestriction(subscription: Subscription): Subscription {
        if (subscription.subscriber && subscription.subscriber instanceof User) {
            delete subscription.subscriber.local;
            delete subscription.subscriber.facebook;
        }
        return subscription;
    }

}
