export function extractVideoType(mimetype: String) {
    const videoType = mimetype.split('/')[1]
    return videoType;
}