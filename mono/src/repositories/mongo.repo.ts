import { ObjectId } from "mongodb";
import Videos from "../models/video.model";

interface VideoForMongo {
  idUser: string;
  url: string;
}

export class VideoRepository {
  async getAllVideos(idUser: string) {
    try {
      return await Videos.find({idUser: idUser});
    } catch (error) {
      console.log(error);
    }
  }

  async uploadVideosMongo(video: VideoForMongo) {
    const newVideo = new Videos(video);
    return await newVideo.save();
  }
  async DeleteVideo(id: ObjectId) {
    return await Videos.deleteOne({_id: id})
  }
}
