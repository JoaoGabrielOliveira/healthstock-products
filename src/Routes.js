import express from 'express';
import { saveCategory } from './service/Category.js';

const router = express.Router();

router.post('/category', saveCategory)

export default router;