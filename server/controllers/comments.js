import PostComment from '../models/postComment.js';
import mongoose from 'mongoose';

export const getComments = async(req, res) => {
    try {
        const postComments = await PostComment.find();

        res.status(200).json(postComments)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addComments = async (req, res) => {
    const comment = req.body;
    console.log(req)
    const newComment = new PostComment({ ...comment, createdAt: new Date().toISOString() });

    try {
        await newComment.save();

        res.status(201).json(newComment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const editComment = async (req, res) => {
    const { id } = req.params;
    const editedComment = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostComment.findByIdAndUpdate(id, editedComment, { new: true });

    res.json(editedComment);
}

export const deleteComment = async (req, res) => {
    const { id } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostComment.findByIdAndRemove(id);

    res.json({ message: "Comment deleted successfully." });
}