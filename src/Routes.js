import express from 'express';
import { getAllCategories, getCategory, saveCategory } from './service/Category.js';
import { saveProduct } from './service/Product.js';

const router = express.Router();

router.post('/category', saveCategory);
router.get( '/category', getAllCategories);
router.get( '/category/:id', getCategory);

router.post( '/product', saveProduct);


export default router;