import { VideoService } from "../services/mongo-video.service";
import { Request, Response } from "express";
import { extractIdToken } from "../utils/returnUserIdToken";
import checkTimeLinks from "../utils/checkTimeLinks";

export class VideoController {
  async getVideos(req: Request, res: Response): Promise<any> {
    try {
      const token = req.headers.authorization?.split(" ")[1] ?? "";
      const idUser = extractIdToken(token);

      const videoService = VideoService.getInstance();
      if (idUser) {
        const videos = await videoService.getVideosService(idUser);
        videos?.map(async (video: any) => {
          const validate = checkTimeLinks(video.time);
          if (validate) await videoService.DeleteVideoService(video._id);
        });

        return res.json(videos);
      }
    } catch (error) {
      console.error("Error al obtener videos:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
