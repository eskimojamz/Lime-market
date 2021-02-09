import express from 'express';

import { getListings, createListing, updateListing } from '../controllers/listings.js';

const router = express.Router();

router.get('/', getListings);
router.post('/', createListing)
router.patch('/:id', updateListing);

export default router;