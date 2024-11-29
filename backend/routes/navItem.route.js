import express from 'express';
import {
  createNavItem,
  deleteNavItem,
  getAllNavItems
} from '../controllers/navItem.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', getAllNavItems);

router.post('/', verifyToken, createNavItem);

router.delete('/:id', verifyToken, deleteNavItem);

export default router;
