import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {ITeammateRecord, TeammateRecord, TeammateRecordModel} from "../models/TeammateRecord";

export interface ITeammateRecordRepository extends IBaseRepository<TeammateRecord> {
    searchRecord (query): Promise<TeammateRecord[]>;
}

export class TeammateRecordRepository extends BaseRepository<TeammateRecord, ITeammateRecord> implements ITeammateRecordRepository {

    constructor() {
        super(TeammateRecordModel);
    }

    searchRecord (conditions: any): Promise<TeammateRecord[]>{
        return TeammateRecordModel.find(conditions).lean().exec()
            .then((teammateRecords: TeammateRecord[]) => {
            return Promise.all(teammateRecords.map((record)=>this.applyAdditionalFunction(record)));
        });
    }
}


