import {UserDto} from "../auth/UserDto";

export interface TeammateRatingDto {
    _id: string;
    satisfied: boolean;
    comment: string;
    createdBy: UserDto;
    createdAt: Date;
    updatedAt: Date;
}