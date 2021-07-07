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