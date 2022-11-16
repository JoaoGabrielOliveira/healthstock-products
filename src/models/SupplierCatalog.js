import { BaseEntity, EntitySchema } from "typeorm";
import PackageType from "./PackageType.js";
import Product from './Product.js';
import SupplierCatalogPhoto from "./SupplierCatalogPhoto.js";

export default class SupplierCatalog extends BaseEntity{
    id; name; description; photos; photo; price;
    product; supplierId; packageType;

    constructor(body){
        super();
        this.name = body?.name;
        this.description = body?.description;

        this.supplierId = body?.supplierId;
        this.product = body?.productId;
        this.packageType = body?.packageTypeId;
        this.price = body?.price;
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
        },
        price: {
            type: 'decimal',
            nullable: false,
            default: 11.99
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
        photos: {
            type: 'one-to-many',
            target: 'SupplierCatalogPhoto',
            nullable: true,
        },
        photo: {
            type: 'many-to-one',
            target: 'SupplierCatalogPhoto',
            nullable: true
        }
    }
})