/**
 * Created by Phillip on 2017-07-02.
 */
import {NextFunction, Request, Response, Router} from "express";
import {BaseAPI} from "./BaseAPI";
import {APIUrls} from "../urls";
import {multerUpload} from "../middlewares/Multer";
import {StorageTypeEnum} from "../enums/StorageType";
import {User} from "../models/User";
import {IFileSystemService} from "../services/FileSystemService";
import {AuthRequest, mustBeAuthenticated} from "../middlewares/AuthMiddleware";
import {AppError} from "../errors/AppError";
import {ClientError} from "../errors/HttpStatus";

export class FileUploadAPI extends BaseAPI {

    private readonly FILE_UPLOAD_NAME = "files";
    private service: IFileSystemService;
    public router: Router;

    constructor(service: IFileSystemService) {
        super();
        this.service = service;
        this.router = Router();
        this.router.post(APIUrls.Upload, mustBeAuthenticated, this.storeFileInMemory, this.saveFiles);
        this.router.post(APIUrls.PreviewImageUpload, mustBeAuthenticated, this.storeFileInMemory, this.saveFiles);

    }

    public storeFileInMemory = multerUpload(StorageTypeEnum.MEMORY).array(this.FILE_UPLOAD_NAME);

    public saveFiles = (req: AuthRequest, res: Response, next: NextFunction) => {
        // let user: User = req.user;
        let files = <Express.Multer.File[]> req.files;
        let result: Promise<any> = Promise.all(
            files.map((file: Express.Multer.File) => {
                return this.service.saveUploadedFile(file, req.user);
            })
        );
        this.respondPromise(result, res, next);
    };

    public savePreviewImage = (req: AuthRequest, res: Response, next: NextFunction) => {
        // let user: User = req.user;
        let files = <Express.Multer.File[]> req.files;
        if (files.length !== 1) {
            next(new AppError("You can only upload one preview image.", ClientError.BAD_REQUEST));
            return;
        }
        let result = this.service.saveUploadedFile(files[0], req.user);
        this.respondPromise(result, res, next);
    };

}
