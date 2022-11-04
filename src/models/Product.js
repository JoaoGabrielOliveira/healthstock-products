import { BaseEntity, EntitySchema } from "typeorm";
import Category from "./Category.js";

export default class Product extends BaseEntity{
    id; name; description; category;

    constructor(body){
        super();
        this.name = body?.name;
        this.description = body?.description;
        this.category = body?.categoryId;
    }
}

export const Schema = new EntitySchema({
    name: "Product",
    tableName: "products",
    target: Product,
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
        }
    },
    relations: {
        category: {
            type: 'many-to-one',
            target: 'Category',
            joinColumns: {
                name: 'categoryId'
            },
            nullable: false
        },
        productPhoto: {
            type: 'one-to-one',
            target: 'ProductPhoto',
            joinColumn: {
                name: 'productPhotoId'
            },
            nullable: true
        },
    }
})