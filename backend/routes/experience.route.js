import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
  addExperience,
  deleteExperience,
  getAllExperiences
} from '../controllers/experiences.controller.js';

const router = express.Router();

router.get('/', getAllExperiences);

router.post('/', verifyToken, addExperience);

router.delete('/:id', verifyToken, deleteExperience);

export default router;
