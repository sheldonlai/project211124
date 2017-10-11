import {NextFunction, Response, Router} from "express";
import {BaseAPI} from "./BaseAPI";
import {APIUrls} from "../urls";
import {AuthRequest, mustBeAuthenticated} from "../middlewares/AuthMiddleware";
import {INotificationService} from "../services/NotificationService";
import {User} from "../models/User";
import {Notification} from "../models/Notification";
import {Types} from "mongoose";

export class NotificationAPI extends BaseAPI {

    public router: Router;
    constructor(private service: INotificationService) {
        super();
        this.router = Router();
        this.router.get(APIUrls.getNotificationsByUser, mustBeAuthenticated, this.getNotificationsByUser);
        this.router.put(APIUrls.notificationSeen, mustBeAuthenticated, this.notificationSeen);
        this.router.post(APIUrls.deleteNotification, mustBeAuthenticated, this.deleteNotification);
    }

    /**
     * Return an array of all notifications where the "recipient" is the current user.
     * Result is sorted by date from latest to oldest.
     */
    public getNotificationsByUser = (req: AuthRequest, res: Response, next: NextFunction) => {
        const currentUser: User = req.user;
        const promise: Promise<Array<Notification>> = this.service.getByUser(currentUser);
        this.respondPromise(promise, res, next);
    };

    /**
     * Updates the given notification to "has been read".
     * Returns the updated notification.
     */
    public notificationSeen = (req: AuthRequest, res: Response, next: NextFunction) => {
        const currentUser: User = req.user;
        const notificationID: Types.ObjectId = new Types.ObjectId(req.params.id);
        const promise: Promise<Notification> = this.service.notificationSeen(currentUser, notificationID);
        this.respondPromise(promise, res, next);
    };

    /**
     * Deletes the given notification.
     */
    public deleteNotification = (req: AuthRequest, res: Response, next: NextFunction) => {
        const currentUser: User = req.user;
        const notificationID: Types.ObjectId = new Types.ObjectId(req.params.id);
        const promise: Promise<Notification> = this.service.deleteNotificationByID(currentUser, notificationID);
        this.respondPromise(promise, res, next);
    };

}
