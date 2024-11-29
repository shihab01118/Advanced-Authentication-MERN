import express from 'express';
import { addSkill, deleteSkill, getAllSkills } from '../controllers/skills.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', getAllSkills);

router.post('/', verifyToken, addSkill);

router.delete('/:id', verifyToken, deleteSkill);

export default router;
