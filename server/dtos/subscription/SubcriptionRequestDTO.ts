import {NotifiableEntityTypeDTO} from "./NotifiableEntityTypeDTO";
/**
 * Created by Phillip on 2017-09-08.
 */

export interface SubscriptionRequestDTO {
    notifiableEntityID? : string;
    notifiableEntityType? : NotifiableEntityTypeDTO
}