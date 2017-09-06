import {UniversityDto} from "../location/UniversityDto";
import {CountryDto} from "../location/CountryDto";
import {StoryDto} from "../story/StoryDto";

export class ProfileDto {
    username: string;
    university: UniversityDto;
    country: CountryDto;
    stories: StoryDto[];
    questions: StoryDto[];
}