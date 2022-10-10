import { BaseEntity, EntitySchema } from "typeorm";
import PackageType from "./PackageType.js";
import Product from './Product.js';

export default class SupplierCatalog extends BaseEntity{
    id; name; description; product; packageType;
    productId; supplierId; packageTypeId;

    constructor(body){
        super();
        this.name = body?.name;
        this.description = body?.description;

        this.productId = body?.productId;
        this.supplierId = body?.supplierId;
        this.packageTypeId = body?.packageTypeId;
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
            nullable: true
        },
        supplierId: {
            type: 'integer',
            nullable: false
        }
    }
})