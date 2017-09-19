import {User} from "../models/User";
import {Subscription} from "../models/Subscription";
import {ISubscriptionRepository} from "../repositories/SubcriptionRepository";
import {INotificationService} from "./NotificationService";
import {AppError} from "../errors/AppError";
import {ClientError} from "../errors/HttpStatus";
import {NotifiableEntity} from "../models/NotificableEntity";
import {Types} from "mongoose";
import {Notification} from "../models/Notification";
import {BaseModel} from "../models/Base/BaseModel";

export interface ISubscriptionService {
    notify(notifiableEntity: NotifiableEntity): Promise<Array<Notification>>
    subscribe(subscriber: User, subscribeeID: Types.ObjectId, subscribeeType: string): Promise<Subscription>;
    unsubscribe(subscriber: User, subscriptionID: Types.ObjectId): Promise<Subscription>;
    isSubscribed(subscriber: User, subscribeeID: Types.ObjectId, subscribeeType: string): Promise<boolean>;
    getSubscribers(subscribeeID: Types.ObjectId, subscribeeType: string): Promise<Array<Subscription>>;
    getSubscribees(subscriber: User): Promise<Array<Subscription>>;
    getBySubscribeeType(subscriber: User, subscribeeType: string): Promise<Array<Subscription>>;
    getByID(subscriptionID: Types.ObjectId): Promise<Subscription>;
    deleteByID(user: User, subscriptionID: Types.ObjectId): Promise<Subscription>;
}

export class SubscriptionService implements ISubscriptionService {
    constructor(private subscriptionRepository: ISubscriptionRepository,
                private notificationService: INotificationService) {
    }

    async notify(notifiableEntity: NotifiableEntity): Promise<Array<Notification>> {
        let subscriptions: Array<Subscription> = await this.getSubscribers(notifiableEntity.getID(), notifiableEntity.getType());
        return Promise.all(subscriptions.map((subscription: Subscription) => {
            let subscriber: User = <User>subscription.subscriber;
            return this.notificationService.create(subscriber, notifiableEntity);
        }));
    }

    async subscribe(subscriber: User, subscribeeID: Types.ObjectId, subscribeeType: string): Promise<Subscription> {
        const alreadySubscribed: boolean = await this.isSubscribed(subscriber, subscribeeID, subscribeeType);
        if (!alreadySubscribed) {
            let newSubscription: Subscription = new Subscription(subscriber._id, subscribeeID, subscribeeType);
            return this.subscriptionRepository.create(newSubscription);
        } else {
            throw new AppError("User is already subscribed", ClientError.BAD_REQUEST);
        }
    }

    unsubscribe(subscriber: User, subscriptionID: Types.ObjectId): Promise<Subscription> {
        return this.deleteByID(subscriber, subscriptionID);
    }

    isSubscribed(subscriber: User, subscribeeID: Types.ObjectId, subscribeeType: string): Promise<boolean> {
        return this.subscriptionRepository.subscriptionExists(subscriber, subscribeeID, subscribeeType);
    }

    getSubscribers(subscribeeID: Types.ObjectId, subscribeeType: string): Promise<Array<Subscription>> {
        return this.subscriptionRepository.getSubscribers(subscribeeID, subscribeeType);
    }

    getSubscribees(subscriber: User): Promise<Array<Subscription>> {
        return this.subscriptionRepository.getSubscribees(subscriber);
    }

    getBySubscribeeType(subscriber: User, subscribeeType: string): Promise<Array<Subscription>> {
        return this.subscriptionRepository.getSubscribees(subscriber, subscribeeType);
    }

    async getByID(subscriptionID: Types.ObjectId): Promise<Subscription> {
        return await this.subscriptionRepository.getById(subscriptionID);
    }

    async deleteByID(user: User, subscriptionID: Types.ObjectId): Promise<Subscription> {
        let subscription: Subscription = await this.subscriptionRepository.getById(subscriptionID);
        this.checkOwner(user, subscription);
        return this.subscriptionRepository.deleteById(subscriptionID);
    }

    private checkOwner(user: User, subscription: Subscription): void {
        if (BaseModel.hasSameID(user,subscription.subscriber)) {
            throw new AppError("Current user is not the owner of this subscription!", ClientError.UNAUTHORIZED);
        }
    }

}