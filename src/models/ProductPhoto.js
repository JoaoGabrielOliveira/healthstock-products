import { BaseEntity, EntitySchema } from "typeorm";

export default class ProductPhoto extends BaseEntity{
    id; title; supplierCatalog; path;
}

export const Schema = new EntitySchema({
    name: "ProductPhoto",
    tableName: "product_photos",
    target: ProductPhoto,
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
            nullable: true,
        }
    },
    relations: {
        product: {
            type: 'one-to-one',
            target: 'Product'
          },
    }
})