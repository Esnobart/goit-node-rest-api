import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { HttpError } from "../helpers/HttpError.js";
import * as fse from 'fs-extra';
import path from "path";
import Jimp from "jimp";

export class ImageService{
    static initUploadImageMiddleware(fieldName) {
        const multerStorage = multer.diskStorage({
            destination: function (req, res, cb) {
                const uploadPath = path.join(process.cwd(), 'tmp');
                fse.ensureDirSync(uploadPath);
                cb(null, uploadPath)
            },
            filename: (req, res, cb) => {
                const fileName = `${uuidv4()}.jpeg`;
                cb(null, fileName)
            }
        });

        const multerFilter = (req, file, cbk) => {
            if (file.mimetype.startsWith('image/')) {
                cbk(null, true);
            } else {
                cbk(new HttpError(400, 'Upload images only'), false)
            }
        };

        return multer({
            storage: multerStorage,
            fileFilter: multerFilter,
        }).single(fieldName);
    }

    static async saveImage(file, options, ...pathSegments) {
        const tempFilePath = path.join(process.cwd(), 'tmp', file.filename);

        if (file.size > options?.maxFileSize ? options.maxFileSize * 1024 * 1024 : 1 * 1024 * 1024) {
            throw HttpError(400, 'File is too large...')
        }

        const avatar = await Jimp.read(tempFilePath);
        const fileName = file.filename;

        await avatar
          .cover(options?.width ?? 250, options?.height ?? 250)
          .quality(100)
          .writeAsync(path.join(process.cwd(), "public", "avatars", fileName));
        
        await fse.remove(tempFilePath);

        return path.join(...pathSegments, fileName)
        
    }
}