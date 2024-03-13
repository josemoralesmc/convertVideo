import { Request, Response } from "express";
import { IUploadVideoController } from "./types/IUploadVideoController";
import { UploadVideoService } from "../services/upload-video.service";
import { extractIdToken } from "../utils/returnUserIdToken";


export class UploadVideoController implements IUploadVideoController {
    async uploadVideo(req: Request, res: Response) {
        const video = req.file;
        try {
            const token = req.headers.authorization?.split(' ')[1] ?? ''
            const idUser = extractIdToken(token)
            const uploadVideoService = UploadVideoService.getInstance()
            const response = await uploadVideoService.uploadVideo(video, idUser)
            res.json(response)
        } catch (error) {
            throw error;
        }
    }

}
