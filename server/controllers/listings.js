import PostListing from '../models/postListing.js';
import User from '../models/user.js';
import mongoose from 'mongoose';

export const getListings = async(req, res) => {
    try {
        const postListings = await PostListing.find();

        res.status(200).json(postListings)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getListing = async(req, res) => {
    const { listingId } = req.params;

    try {
        const listing = await PostListing.findById(listingId);
        
        res.status(200).json(listing);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createListing = async(req, res) => {
    const listing = req.body;

    const newListing = new PostListing({...listing, createdAt: new Date().toISOString(), likeCount:0});
    
    try {
        await newListing.save();

        res.status(201).json(newListing);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateListing = async (req, res) => {
    const { id: _id } = req.params;
    const listing = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedListing = await PostListing.findByIdAndUpdate(_id, { ...listing, _id }, { new: true });

    res.json(updatedListing);
}

export const deleteListing = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostListing.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likeListing = async (req, res) => {
    const { id } = req.params;
    const userId = Object.keys(req.body)[0];

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Invalid id: ${id}`);
    
    const listing = await PostListing.findById(id);

    const indexLikers = listing.likers.findIndex(i => i === userId) 

    // const user = await User.findById(userId)

    // if (!user) {
    //     new User({ userId: userId, likedListings: [id] })
    // }

    if (indexLikers === -1) {
        listing.likers.push(userId);
    } else {
        listing.likers = listing.likers.filter(i => i !== userId);
    }

    const updatedListing = await PostListing.findByIdAndUpdate(id, listing, { new: true });

    res.json(updatedListing);
    console.log(res.json)
}

// export const saveListing = async (req, res) => {
//     const { id } = req.params;
//     const userId = Object.keys(req.body)[0];

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Invalid id: ${id}`);

//     const newUser = new User({ userId: userId, likedListings: [id] });

//     await newUser.save();
//     res.json(newUser)
// }