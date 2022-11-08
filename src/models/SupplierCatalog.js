import { BaseEntity, EntitySchema } from "typeorm";
import PackageType from "./PackageType.js";
import Product from './Product.js';
import SupplierCatalogPhoto from "./SupplierCatalogPhoto.js";

export default class SupplierCatalog extends BaseEntity{
    id; name; description; photos;
    productId; supplierId; packageTypeId; profilePhotoId;
    product; supplier; packageType;

    constructor(body){
        super();
        this.name = body?.name;
        this.description = body?.description;
        this.supplierId = body?.supplierId;

        this.product = body?.productId;
        this.packageType = body?.packageTypeId;
    }

    getPhotos(){
        if(!this.photos)
            this.photos = SupplierCatalogPhoto.find({where: {
                supplierCatalog: this
            }});

        return this.photos;
    }
}

export const Schema = new EntitySchema({
    name: "SupplierCatalog",
    tableName: "suppliers_catalog",
    target: SupplierCatalog,
    columns: {
        id: {
            primary: true,
            type: 'integer',
            generated: true
        },
        name: {
            type: 'varchar',
            nullable: false,
            unique: true
        },
        description: {
            type: 'text',
            nullable: false,
            default: ''
        },
        supplierId: {
            type: 'integer',
            nullable: false
        }
    },
    relations: {
        product: {
            type: 'many-to-one',
            target: 'Product',
            nullable: false,
        },
        packageType: {
            type: 'many-to-one',
            target: 'PackageType',
            joinColumn: {
                name: 'packageTypeId'
            },
            nullable: false,
        },
        supplierCatalogPhotos: {
            type: 'many-to-one',
            target: 'SupplierCatalogPhoto',
            inverseSide: 'supplierCatalogPhoto',
            nullable: true,
        }
    }
})