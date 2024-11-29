import express from 'express';
import { addSkill } from '../controllers/skills.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, addSkill);

export default router;
