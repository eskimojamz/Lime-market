import express from 'express';

import { getListings, createListing, updateListing, deleteListing } from '../controllers/listings.js';

const router = express.Router();

router.get('/', getListings);
router.post('/', createListing)
router.patch('/:id', updateListing);
router.delete('/:id', deleteListing)

export default router;