import { Request, Response } from "express";

export interface IUploadVideoController{
   uploadVideo(req: Request, res:Response): any
}