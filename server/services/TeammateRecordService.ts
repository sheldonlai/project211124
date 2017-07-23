
import {BaseService} from "./BaseService";
import {ITeammateRecordRepository} from "../repositories/TeammateRecordRepository";
import {TeammateRecordDto} from "../dtos/rating/TeamateDto";
import {TeammateRecord} from "../models/TeammateRecord";
import {SearchTeammateDto} from "../dtos/rating/SearchTeammateDto";

export interface ITeammateRecordService {
    createTeammateRecordRepo (teammateRecord: TeammateRecordDto): Promise<TeammateRecordDto>;
}

export class TeammateRecordService extends BaseService implements ITeammateRecordService{
    constructor(
        private teammateRecordRepo: ITeammateRecordRepository
    ) {
        super();
    }

    createTeammateRecordRepo (teammateRecord: TeammateRecordDto): Promise<TeammateRecordDto>{
        const record = new TeammateRecord(
            teammateRecord.firstName,
            teammateRecord.lastName,
            teammateRecord.description,
            teammateRecord.city,
            teammateRecord.university,
            teammateRecord.year
        );
        return this.teammateRecordRepo.create(record);
    }

    searchTeammateRecord(teammateSearchOption: SearchTeammateDto): Promise<TeammateRecordDto[]>{
        let searchOptions = {};
        return this.teammateRecordRepo.searchRecord(searchOptions);
    }



}