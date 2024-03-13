import { generateUniqueId } from '../utils/generateUniqueId';
import { validateValidVideoFormat } from '../validators';
import { AwsS3Repo } from '../repositories/aws-s3.repo';
import {convertVideoToMp3} from '../utils/convertMp3'
import fs from 'fs/promises'
import { VideoRepository } from '../repositories/mongo.repo';



export class UploadVideoService {
    private static instance: UploadVideoService;
    private awsS3Repo: AwsS3Repo;
    private VideoRepository: VideoRepository;

    private constructor() {
        this.awsS3Repo = new AwsS3Repo();
        this.VideoRepository = new VideoRepository();
    }
    public static getInstance(): UploadVideoService {
        if (!UploadVideoService.instance) {
            UploadVideoService.instance = new UploadVideoService();
        }

        return UploadVideoService.instance;
    }

    public async uploadVideo(video: any, idUser: string) {
        try {
            if (!validateValidVideoFormat(video.mimetype)) {
                return { success: false, message: "Unable to Upload the file", data: 'Invalid video format' };
            }

            const videoName = generateUniqueId() + '.mp3'
            const mp3Path = await convertVideoToMp3(video.buffer, videoName) as string;
            const mp3File = await fs.readFile(mp3Path)
            const params = {
                Bucket: "mp3-dev-cristian",
                Key: videoName,
                Body: mp3File
            };

            await this.awsS3Repo.uploadFile(params)
            const UrlDownload = await this.awsS3Repo.GetUrl(params)
            await this.VideoRepository.uploadVideosMongo({idUser, url:UrlDownload})
            
            await fs.rm(mp3Path)
            
            return { success: true, message: "File Uploaded with Successfull", videoName };
        } catch (error) {
            return { success: false, message: "Unable to Upload the file", data: error };
        }
    }


}



