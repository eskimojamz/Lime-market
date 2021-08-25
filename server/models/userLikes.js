import mongoose from 'mongoose';

const userLikesSchema = mongoose.Schema({
    user: String, 
    userId: String, 
    likedListings: [String],
});

const UserLikes = mongoose.model('UserLikes', userLikesSchema);

export default PostListing;