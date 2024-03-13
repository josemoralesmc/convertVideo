export function validateValidVideoFormat(videoFormat: string): boolean {
    const videoTypes = [
        "video/3gpp",
        "video/3gpp2",
        "video/h261",
        "video/h263",
        "video/h264",
        "video/jpeg",
        "video/jpm",
        "video/mj2",
        "video/mp4",
        "video/mpeg",
        "video/ogg",
        "video/quicktime",
        "video/webm",
        "video/x-m4v",
        "video/x-matroska",
        "video/x-ms-asf",
        "video/x-msvideo"
    ];

    return videoTypes.includes(videoFormat)
}