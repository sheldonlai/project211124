import {UserDto} from "../auth/UserDto";
import {UniversityDto} from "../location/UniversityDto";
import {QuestionDifficulty} from "../../models/Question";
export interface RecruitmentPreviewDto{
    _id: string,
    title: string,
    content: string,
    author: UserDto,
    createdAt: Date,
    updatedAt: Date,
    university: UniversityDto,
    courseDifficulty: QuestionDifficulty,
    groupSize: number,
    views: number,
}