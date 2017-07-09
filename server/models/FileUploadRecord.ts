import {Document, model, Schema} from "mongoose";
import {BaseModel} from "./BaseModel";
import {User} from "./User";
import {FileAccessType} from "../enums/FileAccessType";

export class FileUploadRecord extends BaseModel {
    uploadedBy: User;
    accessType: FileAccessType;
    fileURL: string;
    filename: string;
    originalname: string;
    mimetype: string;
    size: number; // in bytes
    uploadedAt: Date;

    constructor(
        uploadedBy: User,
        accessType: FileAccessType,
        fileURL: string,
        filename: string,
        originalname: string,
        mimetype: string,
        size: number,
        uploadedAt: Date
    ){
        super();
        this.uploadedBy = uploadedBy;
        this.accessType = accessType;
        this.fileURL = fileURL;
        this.filename = filename;
        this.originalname = originalname;
        this.mimetype = mimetype;
        this.size = size;
        this.uploadedAt = uploadedAt;
    }
}

export interface IFileUploadRecord extends FileUploadRecord, Document{}

const fileUploadRecordSchema = new Schema({
    uploadedBy:      {type: Schema.Types.ObjectId, ref: 'user', required: true, index: true},
    accessType:      {type: String, enum: Object.keys(FileAccessType), required: true},
    fileURL:         {type: String, required: true, unique: true, index: true},
    fileName:        {type: String, required: true, unique: true},
    originalname:    {type: String, required: true},
    mimeType:        {type: String, required: true},
    size:            {type: Number, required: true},
    uploadedAt:      {type: Date, default: Date.now}
});

export const FileUploadRecordModel = model<IFileUploadRecord>('fileRecordSchema', fileUploadRecordSchema);



