import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import config from '../../../convert-video-to-mp3-microservice/src/config/config';


interface UploadFileParams {
    Bucket: string,
    Key: string,
    Body: any
}

export class AwsS3Repo {
    private s3ConfigObject = {
            region: 'us-east-1',
            credentials: {
                accessKeyId: config.AWS_ACCESS_KEY_ID_CONVERT as string,
                secretAccessKey: config.AWS_SECRET_ACCESS_KEY_CONVERT as string
            }
        }
    private s3Client: S3Client;

    constructor() {
        this.s3Client = new S3Client(this.s3ConfigObject);
    }
    async uploadFile( params:UploadFileParams) {
        const command = new PutObjectCommand(params);
        
        const res = await this.s3Client.send(command);
        
    }

    async GetUrl(params:UploadFileParams){
        const command = new GetObjectCommand(params)
        return await getSignedUrl(this.s3Client, command, {expiresIn: 360000})
    }






}