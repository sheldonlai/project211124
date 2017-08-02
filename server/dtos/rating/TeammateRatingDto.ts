import {UserDto} from "../auth/UserDto";

export interface TeammateRatingDto {
    _id: string;
    rating: number;
    comment: string;
    createdBy: UserDto;
    createdAt: Date;
    updatedAt: Date;
}