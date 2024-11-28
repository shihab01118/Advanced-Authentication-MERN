import express from 'express';
import { createNavItem } from '../controllers/navItem.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, createNavItem);

export default router;
