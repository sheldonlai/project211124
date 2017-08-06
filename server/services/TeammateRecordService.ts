import {BaseService} from "./BaseService";
import {ITeammateRecordRepository} from "../repositories/TeammateRecordRepository";
import {TeammateRecordDto} from "../dtos/rating/TeammateRecordDto";
import {TeammateRecord} from "../models/TeammateRecord";
import {SearchTeammateDto} from "../dtos/rating/SearchTeammateDto";
import {User} from "../models/User";
import {TeammateRatingDto} from "../dtos/rating/TeammateRatingDto";
import {TeammatePreviewDto} from "../dtos/rating/TeammatePreviewDto";
import {AppError} from "../errors/AppError";
import {ClientError} from "../errors/HttpStatus";

export interface ITeammateRecordService {
    createTeammateRecordRepo (teammateRecord: TeammateRecordDto, currentUser: User): Promise<TeammateRecordDto>;

    getRecentTeammateRecordPreview (currentUser?: User): Promise<TeammatePreviewDto[]>;

    getTeammateRecord(teammateRecordId: string): Promise<TeammateRecordDto>;

    addRating(teammateRatingDto: TeammateRatingDto, teammateRatingId: string, currentUser: User): Promise<TeammateRecordDto>;

    editRating(teammateRatingDto: TeammateRatingDto, teammateRatingId: string, currentUser: User): Promise<TeammateRecordDto>;

}

export class TeammateRecordService extends BaseService implements ITeammateRecordService {
    constructor(private teammateRecordRepo: ITeammateRecordRepository) {
        super();
    }

    createTeammateRecordRepo(teammateRecord: TeammateRecordDto, currentUser: User): Promise<TeammateRecordDto> {
        const record = new TeammateRecord(
            teammateRecord.firstName,
            teammateRecord.lastName,
            teammateRecord.description,
            currentUser,
            teammateRecord.university,
            teammateRecord.year,
            teammateRecord.city,
        );
        return this.teammateRecordRepo.create(record);
    }


    searchTeammateRecord(teammateSearchOption: SearchTeammateDto): Promise<TeammateRecordDto[]> {
        let searchOptions: any = {
            $and: [
                {firstName: {$regex: teammateSearchOption.firstName, options: "i"}}
            ]
        };
        if (teammateSearchOption.lastName) {
            searchOptions.$and.push(
                {lastName: {$regex: teammateSearchOption.lastName, options: "i"}}
            );
        }
        if (teammateSearchOption.university) {
            searchOptions.$and.push(
                {university: teammateSearchOption.university._id}
            );
        }
        if (teammateSearchOption.city) {
            searchOptions.$and.push(
                {city: teammateSearchOption.city}
            );
        }
        return this.teammateRecordRepo.searchRecord(searchOptions).then((list: TeammateRecord[]) => {
            return this.sortRecordByRelevency(list);
        });
    }

    getRecentTeammateRecordPreview(currentUser?: User): Promise<TeammatePreviewDto[]> {
        if (currentUser) {
            // TODO sort by user preference
        }
        return this.teammateRecordRepo.getAll({sort: "-createdAt"}).then((teammates: TeammateRecord[]) => {

            return teammates.map((teammate) => {
                let sum = 0;
                for (let rating of teammate.ratings) {
                    sum += rating.rating;
                }
                let avgRating = sum / teammate.ratings.length;
                return {
                    _id: teammate._id,
                    firstName: teammate.firstName,
                    lastName: teammate.lastName,
                    averageRating: avgRating,
                    university: teammate.university,
                    year: teammate.year,
                    city: teammate.city
                }
            });
        })
    }

    getTeammateRecord(teammateRecordId: string): Promise<TeammateRecordDto> {
        return this.teammateRecordRepo.getById(teammateRecordId);
    }

    addRating(teammateRatingDto: TeammateRatingDto,
              teammateRatingId: string,
              currentUser: User): Promise<TeammateRecordDto> {
        return this.teammateRecordRepo.getById(teammateRatingId).then((teammate: TeammateRecord) => {
            const now = new Date(Date.now());
            teammateRatingDto.createdAt = now;
            teammateRatingDto.updatedAt = now;
            teammateRatingDto.createdBy = currentUser;
            teammate.ratings.push(teammateRatingDto);
            return this.teammateRecordRepo.update(teammate);
        });
    }

    editRating(teammateRatingDto: TeammateRatingDto,
               teammateRatingId: string,
               currentUser: User): Promise<TeammateRecordDto> {
        return this.teammateRecordRepo.getById(teammateRatingId).then((teammate: TeammateRecord) => {
            const now = new Date(Date.now());
            let found = false;
            for (let rating of teammate.ratings) {
                if (rating._id.toString() === teammateRatingDto._id &&
                    rating.createdBy._id.toString() === currentUser._id.toString()) {
                    rating.createdBy = teammateRatingDto.createdBy;
                    rating.rating = teammateRatingDto.rating;
                    rating.comment= teammateRatingDto.comment;
                    rating.updatedAt = now;
                    found = true;
                    break;
                }
            }
            if (!found) {
                throw new AppError("The specified rating does not exist.", ClientError.BAD_REQUEST);
            }
            return this.teammateRecordRepo.update(teammate);
        });
    }


    sortRecordByRelevency(list: TeammateRecord[]): TeammateRecord[] {
        return list;
    }

}