import {NextFunction, Response, Router} from "express";
import {BaseAPI} from "./BaseAPI";
import {AuthRequest, maybeAuthenticated, mustBeAuthenticated} from "../middlewares/AuthMiddleware";
import {ISubscriptionService} from "../services/SubscriptionService";
import {User} from "../models/User";
import {Subscription} from "../models/Subscription";
import {Types} from "mongoose";
import {SubscriptionRequestDTO} from "../dtos/subscription/SubcriptionRequestDTO";
import {APIUrls} from "../urls";
import {SubscriptionConversions} from "../conversions/SubscriptionConversions";
import {NotifiableEntityTypeDTO} from "../dtos/subscription/NotifiableEntityTypeDTO";

export class SubscriptionAPI extends BaseAPI {

    public router: Router;

    constructor(private service: ISubscriptionService,
                private subscriptionConversions: SubscriptionConversions) {
        super();
        this.router = Router();
        this.router.post(APIUrls.subscribe, mustBeAuthenticated, this.subscribe);
        this.router.delete(APIUrls.unsubscribe, mustBeAuthenticated, this.unsubscribe);
        this.router.post(APIUrls.getSubscribers, maybeAuthenticated, this.getSubscribers);
        this.router.get(APIUrls.getUserSubscription, mustBeAuthenticated, this.getUserSubscriptions);
        this.router.get(APIUrls.getBySubscribeeType, mustBeAuthenticated, this.getUserSubscriptionsByType);
        this.router.get(APIUrls.getByID, mustBeAuthenticated, this.getByID);
    }

    /**
     * Subscribe the current user to the given notifiable entity id & type
     */
    public subscribe = (req: AuthRequest, res: Response, next: NextFunction) => {
        const currentUser: User = req.user;
        const requestDTO: SubscriptionRequestDTO = req.body;
        const promise: Promise<Subscription> = this.service.subscribe(
            currentUser,
            new Types.ObjectId(requestDTO.notifiableEntityID),
            this.subscriptionConversions.toNotifiableEntityType(requestDTO.notifiableEntityType));
        this.respondPromise(promise, res, next);
    };

    /**
     * Unsubscribe the current user from the given subscriptionId
     */
    public unsubscribe = (req: AuthRequest, res: Response, next: NextFunction) => {
        const currentUser: User = req.user;
        const subscriptionId: Types.ObjectId = new Types.ObjectId(req.params.id);
        const promise: Promise<Subscription> = this.service.unsubscribe(currentUser, subscriptionId);
        this.respondPromise(promise, res, next);
    };

    /**
     * Get all subscribers that subscribed to the given notifiable entity id & type
     */
    public getSubscribers = (req: AuthRequest, res: Response, next: NextFunction) => {
        const requestDTO: SubscriptionRequestDTO = req.body;
        const promise: Promise<Array<Subscription>> = this.service.getSubscribers(
            new Types.ObjectId(requestDTO.notifiableEntityID),
            this.subscriptionConversions.toNotifiableEntityType(requestDTO.notifiableEntityType));
        this.respondPromise(promise, res, next);
    };

    /**
     * Get all subscriptions that belongs to the current user
     */
    public getUserSubscriptions = (req: AuthRequest, res: Response, next: NextFunction) => {
        const currentUser: User = req.user;
        const promise: Promise<Array<Subscription>> = this.service.getUserSubscriptions(currentUser);
        this.respondPromise(promise, res, next);
    };

    /**
     * Get all subscriptions with the given notifiableEntity type and belongs to the current user
     */
    public getUserSubscriptionsByType = (req: AuthRequest, res: Response, next: NextFunction) => {
        const currentUser: User = req.user;
        const requestDTO: NotifiableEntityTypeDTO = req.body;
        const promise: Promise<Array<Subscription>> = this.service.getUserSubscriptionsByType(
            currentUser,
            this.subscriptionConversions.toNotifiableEntityType(requestDTO));
        this.respondPromise(promise, res, next);
    };

    /**
     * Get a fully populated subscription object by the given subscriptionID
     */
    public getByID = (req: AuthRequest, res: Response, next: NextFunction) => {
        const subscriptionID: Types.ObjectId = new Types.ObjectId(req.params.id);
        const promise: Promise<Subscription> = this.service.getByID(subscriptionID);
        this.respondPromise(promise, res, next);
    };

    

}
