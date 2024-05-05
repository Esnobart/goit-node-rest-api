import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { HttpError } from "../helpers/HttpError.js";
import * as fse from 'fs-extra';
import sharp from "sharp";
import path from "path";
import Jimp from "jimp";

export class ImageService{
    static initUploadImageMiddleware(fieldName) {
        const multerStorage = multer.memoryStorage();

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
        if (file.size > options?.maxFileSize ? options.maxFileSize * 1024 * 1024 : 1 * 1024 * 1024) {
            throw HttpError(400, 'File is too large...')
        }

        const fileName = `${uuidv4()}.jpeg`;
        const pathOrigFile = path.join(process.cwd(), 'tmp');
        const fullFilePath = path.join(pathOrigFile, fileName);

        await fse.ensureDir(pathOrigFile);
        await fse.outputFile(fullFilePath, file.buffer);
        const avatar = await Jimp.read(fullFilePath);
        await avatar
          .cover(options?.width ?? 250, options?.height ?? 250)
          .quality(100)
          .writeAsync(path.join(process.cwd(), "public", "avatars", fileName));

        return path.join(...pathSegments, fileName)
    }
}