import mongoose from 'mongoose';

const listingSchema = mongoose.Schema({
    title: String, 
    description: String,
    price: {
        type: Number,
        default: 0
    },
    creator: String,
    creatorName: String,
    creatorImg: String,
    tags: [String],
    selectedFile: [Object],
    createdAt: {
        type: Date, 
        default: new Date().toISOString
    },
    likeCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
});

const PostListing = mongoose.model('PostListing', listingSchema);

export default PostListing;