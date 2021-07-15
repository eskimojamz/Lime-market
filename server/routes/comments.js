import express from 'express';

import { getComments, addComments, editComment, deleteComment } from '../controllers/comments.js';

const router = express.Router();

router.get('/', getComments);
router.post('/', addComments);
router.patch('/:id', editComment);
router.delete('/:id', deleteComment)

export default router;