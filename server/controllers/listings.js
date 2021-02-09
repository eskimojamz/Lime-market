import PostListing from '../models/postListing.js';

export const getListings = async(req, res) => {
    try {
        const postListings = await PostListing.find();

        res.status(200).json(postListings)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createListing = async(req, res) => {
    const listing = req.body;

    const newListing = new PostListing({...listing, createdAt: new Date().toISOString()});
    
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

    const updatedListing = await PostListing.findByIdAndUpdate(_id, listing, { new: true });

    res.json(updatedListing);
}

// export const deletePost = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     await PostMessage.findByIdAndRemove(id);

//     res.json({ message: "Post deleted successfully." });
// }

// export const likePost = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
//     const post = await PostMessage.findById(id);

//     const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
//     res.json(updatedPost);
// }