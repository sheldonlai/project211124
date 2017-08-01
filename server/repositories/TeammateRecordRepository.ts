import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {ITeammateRecord, TeammateRating, TeammateRecord, TeammateRecordModel} from "../models/TeammateRecord";
import {isNullOrUndefined} from "util";

export interface ITeammateRecordRepository extends IBaseRepository<TeammateRecord> {
    searchRecord (query): Promise<TeammateRecord[]>;
    addRating(recordId: string, rating: TeammateRating): Promise<TeammateRecord>;
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

    addRating(recordId: string, rating: TeammateRating): Promise<TeammateRecord> {
        return this.getById(recordId).then((record) => {
            record.ratings.push(rating);
            return this.update(record);
        });
    }

    protected applyRestriction(record: TeammateRecord): TeammateRecord {
        if (record.createdBy) {
            delete record.createdBy.local;
        }
        record.ratings = record.ratings.map((rating) => {
            delete rating.createdBy.local;
            return rating;
        });
        return record;
    }
}


