import mongoose from 'mongoose';

const listingSchema = mongoose.Schema({
    title: String, 
    description: String,
    price: String,
    creator: String,
    creatorName: String,
    creatorImg: String,
    selectedFile: [Object],
    createdAt: {
        type: Date, 
        default: new Date().toISOString
    }
});

const PostListing = mongoose.model('PostListing', listingSchema);

export default PostListing;