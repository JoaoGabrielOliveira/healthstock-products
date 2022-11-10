import { BaseEntity, EntitySchema } from "typeorm";

export default class SupplierCatalogPhoto extends BaseEntity{
    id; title; supplierCatalog; path;
    
    constructor(body){
        super();
        this.id = body?.id;
        this.title = body?.title;
        this.path = body?.path;
        this.supplierCatalog = body?.supplierCatalogId;
    }
}

export const Schema = new EntitySchema({
    name: "SupplierCatalogPhoto",
    tableName: "supplier_catalog_photos",
    target: SupplierCatalogPhoto,
    columns: {
        id: {
            primary: true,
            type: 'integer',
            generated: true
        },
        title: {
            type: 'varchar',
            nullable: true,
            default: ''
        },
        path: {
            type: 'text',
            nullable: false,
            unique: true
        }
    },
    relations: {
        supplierCatalog: {
            type: 'many-to-one',
            target: 'SupplierCatalog',
            joinColumn: {
                name:"supplierCatalogId"
            },
            nullable: false,
          },
    }
})