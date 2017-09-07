import {UniversityDto} from "../location/UniversityDto";
import {CountryDto} from "../location/CountryDto";
import {StoryDto} from "../story/StoryDto";
import {QuestionPreviewDto} from "../q&a/QuestionPreviewDto";

export class ProfileDto {
    username: string;
    university: UniversityDto;
    country: CountryDto;
    points: number;
    stories: StoryDto[];
    questions: QuestionPreviewDto[];
}