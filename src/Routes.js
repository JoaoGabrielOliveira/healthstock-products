import express from 'express';
import { getAllCategories, getCategory, saveCategory } from './service/Category.js';

const router = express.Router();

router.post('/category', saveCategory);
router.get( '/category', getAllCategories);
router.get( '/category/:id', getCategory);


export default router;