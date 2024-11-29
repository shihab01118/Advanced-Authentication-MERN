import express from 'express';
import {
  getAllReviews,
  addReview,
  deleteReview
} from '../controllers/reviews.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', getAllReviews);

router.post('/', addReview);

router.delete('/:id', verifyToken, deleteReview);

export default router;
