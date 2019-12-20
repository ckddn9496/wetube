import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: "Text is required"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // Comment가 Video를 갖고 있도록
    // video: {
    //     type: mongoose.Schema.Types.ObjectId, // 어느 model에서 온건지
    //     ref: "Video" // const model = mongoose.model("Video", VideoSchema); 로 저장
    // }
});

const model = mongoose.model("Comment", CommentSchema);

export default model;