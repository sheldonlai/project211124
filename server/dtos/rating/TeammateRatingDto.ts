import {UserDto} from "../auth/UserDto";

export interface TeammateRatingDto {
    _id: string;
    rating: number;
    comment: string;
    created: UserDto;
    createdAt: Date;
    upDatedAt: Date;
}