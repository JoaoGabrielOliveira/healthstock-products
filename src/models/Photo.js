import { BaseEntity, EntitySchema } from "typeorm";

export default class Photo extends BaseEntity{
    id; title; description; supplierCatalog;
    urlData; blobData;
}

export const Schema = new EntitySchema({
    name: "Photo",
    tableName: "photos",
    target: Photo,
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
        urlData: {
            type: 'text',
            nullable: true,
        },
        blobData: {
            type: 'text',
            nullable: true
        }
    },
    relations: {
        supplierCatalog: {
            type: 'many-to-one',
            target: 'SupplierCatalog'
          },
    }
})