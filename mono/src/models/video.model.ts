import mongoose from "mongoose";

const videosSchema = new mongoose.Schema({
    idUser: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    time : { type : Date, default: Date.now }
})

export default mongoose.model('Video', videosSchema)