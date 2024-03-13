import { ObjectId } from "mongodb";
import { VideoRepository } from "../repositories/mongo.repo";

export class VideoService {
  private static instance: VideoService;
  private videoService: VideoRepository;

  private constructor() {
    this.videoService = new VideoRepository();
  }

  public static getInstance(): VideoService {
    if (!VideoService.instance) {
      VideoService.instance = new VideoService();
    }
    return VideoService.instance;
  }

  async getVideosService(idUser: string) {
    try {
      return await this.videoService.getAllVideos(idUser);
    } catch (error) {
      console.log(error);
    }
  }
  async DeleteVideoService(id: ObjectId) {
    try {
      return await this.videoService.DeleteVideo(id)
    } catch (error) {
      console.log(error);
    }
  }
}
