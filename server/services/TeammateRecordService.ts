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
import {SearchByNameAndUniversityQuery, BlurrySearch, PreciseSearch} from "../elasticSearch/TeammateRecordQueries";
import {elasticSearchModel} from "../elasticSearch/ElasticSearchUtils";
import {universitySchema} from "../models/LocationModels/Universities";
import * as _ from "lodash";
import {STATUS_CODES} from "http";
import {isNullOrUndefined} from "util";

export interface ITeammateRecordService {
    createTeammateRecordRepo (teammateRecord: TeammateRecordDto, currentUser: User): Promise<TeammateRecordDto>;

    searchForSimilarTeammateRecord (t: SearchTeammateDto): Promise<TeammatePreviewDto[]>;

    BlurryTeammateSearch(InputStrings: string[]) : Promise<TeammatePreviewDto[]>;

    PreciseTeammateSearch(TeammateObj: SearchTeammateDto): Promise<TeammatePreviewDto[]>;

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
        this.checkRequiredFields(teammateRecord, ["firstName" , "lastName", "university", "year"]);
        const record = new TeammateRecord(
            teammateRecord.firstName.toLowerCase(),
            teammateRecord.lastName.toLowerCase(),
            teammateRecord.description,
            currentUser,
            teammateRecord.university,
            teammateRecord.year,
            teammateRecord.city,
        );
        return this.teammateRecordRepo.create(record);
    }

    searchForSimilarTeammateRecord (t: SearchTeammateDto): Promise<TeammatePreviewDto[]> {
        let query = SearchByNameAndUniversityQuery(t.firstName, t.lastName, t.university, t.year);
        return this.teammateRecordRepo.searchRecord(query).then((teammates) =>
            teammates.map((teammate) => this.convertTeammateToPreview(teammate)));
    }

    BlurryTeammateSearch(InputStrings: string[]) : Promise<TeammatePreviewDto[]> {
        let query = BlurrySearch(InputStrings);
        return this.teammateRecordRepo.searchRecord(query).then((teammates) =>
            teammates.map((teammate) =>
            {
                return this.convertTeammateToPreview(teammate)
            }));
    }

    PreciseTeammateSearch(TeammateObj: SearchTeammateDto): Promise<TeammatePreviewDto[]> {
        let query = PreciseSearch(TeammateObj.firstName, TeammateObj.lastName, TeammateObj.university, TeammateObj.year, TeammateObj.middleName, TeammateObj.description);
        console.log(JSON.stringify(query));
        return this.teammateRecordRepo.searchRecord(query).then((teammates) =>
            teammates.map((teammate) => {
                return this.convertTeammateToPreview(teammate)
            })
        );
    }

    getRecentTeammateRecordPreview(currentUser?: User): Promise<TeammatePreviewDto[]> {
        if (currentUser) {
            // TODO sort by user preference
        }
        return this.teammateRecordRepo.getAll({sort: "-createdUtc"}).then((teammates: TeammateRecord[]) => {
            return teammates.map((teammate) => this.convertTeammateToPreview(teammate));
        })
    }

    getTeammateRecord(teammateRecordId: string): Promise<TeammateRecordDto> {
        return this.teammateRecordRepo.getById(teammateRecordId);
    }

    addRating(teammateRatingDto: TeammateRatingDto,
              teammateRatingId: string,
              currentUser: User): Promise<TeammateRecordDto> {
        return this.teammateRecordRepo.getById(teammateRatingId).then((teammate: TeammateRecord) => {
            if (_.findIndex(teammate.ratings, (rating) =>
                    rating.createdBy._id.toString() === currentUser._id.toString()) !== -1){
                  throw new AppError("There is already a rating under your name.", ClientError.BAD_REQUEST);
            }
            const now = new Date();
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
                    rating.satisfied = teammateRatingDto.satisfied;
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

    convertTeammateToPreview(teammate : TeammateRecord): TeammatePreviewDto {
        let sum = 0;
        for (let rating of teammate.ratings) {
            sum += (rating.satisfied)? 1: 0;
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
    }

}