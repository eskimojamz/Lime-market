import express from 'express';

import { getListings, getListing, createListing, updateListing, deleteListing, likeListing } from '../controllers/listings.js';

const router = express.Router();

router.get('/', getListings);
router.get('/:listingId', getListing);
router.post('/', createListing);
router.patch('/:id', updateListing);
router.patch('/:id/likeListing', likeListing);
// router.patch('/:id/saveListing', saveListing)
router.delete('/:id', deleteListing);

export default router;