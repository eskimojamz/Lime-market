import express from 'express';

import { getListings, createListing, updateListing, deleteListing, likeListing } from '../controllers/listings.js';

const router = express.Router();

router.get('/', getListings);
router.post('/', createListing);
router.patch('/:id', updateListing);
router.patch('/:id/likeListing', likeListing);
router.delete('/:id', deleteListing);

export default router;