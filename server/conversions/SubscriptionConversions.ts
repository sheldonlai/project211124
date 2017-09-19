import {NotifiableEntityTypeDTO} from "../dtos/subscription/NotifiableEntityTypeDTO";
import {UserModel} from "../models/User";
import {ClientError} from "../errors/HttpStatus";
import {AppError} from "../errors/AppError";

export class SubscriptionConversions {

    toNotifiableEntityType(dto: NotifiableEntityTypeDTO): string {
        switch (dto) {
            case NotifiableEntityTypeDTO.USER: {
                return UserModel.modelName;
            }
            default: {
                throw new AppError("Invalid notifiableEntity type", ClientError.BAD_REQUEST);
            }
        }
    }

}
