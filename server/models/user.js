import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userId: String, 
    likedListings: [String],
});

const User = mongoose.model('User', userSchema);

export default User;