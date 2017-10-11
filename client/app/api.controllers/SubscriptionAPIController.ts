import {ApiController} from "./ApiController";
import {APIUrls} from "../../../server/urls";
import {SubscriptionRequestDTO} from "../../../server/dtos/subscription/SubcriptionRequestDTO";

export class SubscriptionAPIController extends ApiController {
    // this.router.post(APIUrls.subscribe, mustBeAuthenticated, this.subscribe);
    // this.router.post(APIUrls.unsubscribe, mustBeAuthenticated, this.unsubscribe);
    // this.router.post(APIUrls.getSubscribers, maybeAuthenticated, this.getSubscribers);
    // this.router.get(APIUrls.getSubscribees, mustBeAuthenticated, this.getSubscribees);
    // this.router.get(APIUrls.getBySubscribeeType, mustBeAuthenticated, this.getBySubscribeeType);
    // this.router.get(APIUrls.getByID, mustBeAuthenticated, this.getByID);
    subscribe(object: SubscriptionRequestDTO) {
        this.post(APIUrls.subscribe, object);
    }

    unSubscribe (subscriptionId : string) {
        this.delete(APIUrls.unsubscribe.replace(":id", subscriptionId));
    }

    //
    getSubscribers() {
        this.post(APIUrls.getSubscribers, {});
    }

    // get things that the user is subscribed to
    getUserSubscription(){
        this.get(APIUrls.getUserSubscription);
    }
}