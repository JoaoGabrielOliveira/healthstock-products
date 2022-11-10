import express from 'express';
import fileUpload from 'express-fileupload';
import { getAllCategories, getCategory, saveCategory } from './service/Category.js';
import { getAllPackageTypes, getPackageType, savePackageType } from './service/PackageType.js';
import { getAllProducts, getProduct, saveProduct, uploadPhoto } from './service/Product.js';
import { getAllSuppliersCatalog, saveSupplierCatalog } from './service/SupplierCatalog.js';
import { getMarketPlace, getProductFromMarketPlace } from './service/Maketplace.js';
import { getAllPhotosOfSupplierCatalog, getSupplierCatalogPhoto, saveSupplierCatalogPhotos } from './service/SupplierCatalogPhoto.js';

const router = express.Router();
router.use('/static', express.static('src/public'));

router.get('/marketplace', getMarketPlace);
router.get('/marketplace/:id', getProductFromMarketPlace);

router.post('/category', saveCategory);
router.get( '/category', getAllCategories);
router.get( '/category/:id', getCategory);

router.get( '/product', getAllProducts);
router.get( '/product/:id', getProduct);
router.post( '/product', saveProduct);

router.get( '/packagetype', getAllPackageTypes);
router.get( '/packagetype/:id', getPackageType);
router.post('/packagetype', savePackageType);

router.get( '/suppliercatalog/:id', getAllSuppliersCatalog);
router.post('/suppliercatalog', saveSupplierCatalog);

router.get( '/suppliercatalog/:id/photos', getAllPhotosOfSupplierCatalog);
router.get( '/suppliercatalog/:id/photos/:photoId', getSupplierCatalogPhoto);

router.use(fileUpload())
router.post('/product/:id/profile', uploadPhoto);
router.post( '/suppliercatalog/:id/photos', saveSupplierCatalogPhotos);


export default router;