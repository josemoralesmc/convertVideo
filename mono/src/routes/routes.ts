import { Router } from "express";
import { UploadVideoController } from "../controllers/upload-video.controller";
import { VideoController } from "../controllers/mongo-video.controller";
const router = Router();
const controller = new UploadVideoController();
const mongoController = new VideoController()


router.route("/upload").post(controller.uploadVideo)
router.route("/myvideos").get(mongoController.getVideos)
export default router;