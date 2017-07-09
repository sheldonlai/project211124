/**
 * Created by Phillip on 2017-07-02.
 */
import {NextFunction, Request, Response, Router} from "express";
import {BaseAPI} from "./BaseAPI";
import {APIUrls} from "../urls";
import {multerUpload} from "../middlewares/multer";

export class FileUploadAPI extends BaseAPI {

    constructor(router: Router) {
        super();
        router.post(APIUrls.Upload, this.storeFiles, function (req: Request, res: Response, next: NextFunction) {
            return res.json(req.files);
        });
    }

    private storeFiles = multerUpload().array('files');

   // private

}
