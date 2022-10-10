import express from 'express';
import { getAllCategories, getCategory, saveCategory } from './service/Category.js';
import { getAllProducts, getProduct, saveProduct } from './service/Product.js';

const router = express.Router();

router.post('/category', saveCategory);
router.get( '/category', getAllCategories);
router.get( '/category/:id', getCategory);

router.get( '/product', getAllProducts);
router.get( '/product/:id', getProduct);
router.post( '/product', saveProduct);


export default router;