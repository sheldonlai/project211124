/**
 * Created by Phillip on 2017-07-02.
 */
import {NextFunction, Request, Response, Router} from "express";
import {BaseAPI} from "./BaseAPI";
import {APIUrls} from "../urls";
import {multerUpload} from "../middlewares/multer";
import {StorageTypeEnum} from "../enums/StorageType";
import {User} from "../models/User";
import {IFileSystemService} from "../services/FileSystemService";
import {mustBeAuthenticated} from "../middlewares/AuthMiddleware";

export class FileUploadAPI extends BaseAPI {

    private readonly FILE_UPLOAD_NAME = "files";
    private service : IFileSystemService;

    constructor(router: Router,
                service: IFileSystemService) {
        super();
        this.service = service;
        router.post(APIUrls.Upload, this.storeFileInMemory , this.saveFiles);

    }

    public storeFileInMemory = multerUpload(StorageTypeEnum.MEMORY).array(this.FILE_UPLOAD_NAME);

    public saveFiles = (req: Request, res: Response, next: NextFunction) => {
       // let user: User = req.user;
        let files = <Express.Multer.File[]> req.files;
        let result: Promise<any> = Promise.all(
            files.map((file: Express.Multer.File) => {
                return this.service.saveUploadedFile(file, undefined);
            })
        );
        this.respondPromise(result, res, next);
    };

}
