import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    listingId: String,
    creator: String,
    creatorName: String,
    creatorImg: String,
    createdAt: {
        type: Date, 
        default: new Date().toISOString
    },
    body: String,
});

const PostComment = mongoose.model('PostComment', commentSchema);

export default PostComment;