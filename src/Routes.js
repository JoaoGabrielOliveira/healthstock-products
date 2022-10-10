import express from 'express';
import { getAllCategories, getCategory, saveCategory } from './service/Category.js';
import { getAllPackageTypes, getPackageType, savePackageType } from './service/PackageType.js';
import { getAllProducts, getProduct, saveProduct } from './service/Product.js';

const router = express.Router();

router.post('/category', saveCategory);
router.get( '/category', getAllCategories);
router.get( '/category/:id', getCategory);

router.get( '/product', getAllProducts);
router.get( '/product/:id', getProduct);
router.post( '/product', saveProduct);

router.get( '/packagetype', getAllPackageTypes);
router.get( '/packagetype/:id', getPackageType);
router.post('/packagetype', savePackageType);


export default router;