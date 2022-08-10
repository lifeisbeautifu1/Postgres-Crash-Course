import express from 'express';

const router = express.Router();

import { addReview, getReviews } from '../controllers/reviews';

router.get('/:id', getReviews);

router.post('/:id', addReview);

export default router;
