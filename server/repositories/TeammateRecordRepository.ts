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

    create(record: TeammateRecord): Promise<TeammateRecord> {
        return super.create(record).then((teammate: TeammateRecord) => {
            // make sure the rating users are populated
            return this.getById(teammate._id);
        })
    }

    update(record: TeammateRecord): Promise<TeammateRecord> {
        return super.update(record).then((teammate: TeammateRecord) => {
            // make sure the rating users are populated
            return this.getById(teammate._id);
        })
    }
}


