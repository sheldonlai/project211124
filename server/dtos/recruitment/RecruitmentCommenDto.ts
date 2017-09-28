import {UserDto} from "../auth/UserDto";

enum RequestToJoin{
    Yes,
    No,
    Joined,
    Denied,
    NOT_SPECIFIED,
}

export interface RecruitmentCommentDto{
    _id: any;
    request: RequestToJoin;
    comment: string;
    createdBy: UserDto;
    createdAt: Date;
    updatedAt: Date;
}