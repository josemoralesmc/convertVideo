import { Readable } from 'stream';
import { path } from '@ffmpeg-installer/ffmpeg'
import ffmpeg from 'fluent-ffmpeg'

export async function convertVideoToMp3(bufferVideo: any, videoName: string) {
    return new Promise((resolve, reject) => {
        const mp3Path = './mp3/' + videoName;
        const readableBufferVideo = Readable.from(bufferVideo)
        const command = ffmpeg();
        command.setFfmpegPath(path)
        command.input(readableBufferVideo);
        command.format('mp3')
        command.output(mp3Path)
        command.on('end', () => {
            return resolve(mp3Path);
        });
        command.on('start', (commandLine) => {
            console.log('ffmpeg started conversion', commandLine)
        })
        command.on('stderr', function (stderrLine) {
            console.error('Stderr output: ' + stderrLine)
        })
        command.on('error', (err: any) => {
            return reject(err)
        });

        command.run();
    });
}