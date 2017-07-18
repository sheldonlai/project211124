import {ITag, Tag, TagModel} from "../models/Tags";
import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {getUniqueArray} from "../utils/ArrayUtils";
export interface ITagRepository extends IBaseRepository<Tag> {
    getTags(tags: string[]): Promise<Tag[]>;
}

export class TagRepository extends BaseRepository<Tag, ITag> implements ITagRepository {

    constructor() {
        super(TagModel)
    }

    getTags(tags: string[]): Promise<Tag[]> {
        tags = getUniqueArray(tags);
        let promises = [];
        for (let tag of tags) {
            promises.push(
                TagModel.findOneAndUpdate({tag: tag}, {tag: tag}, {new: true, upsert: true}).exec()
            );
        }
        return Promise.all(promises);
    }
}