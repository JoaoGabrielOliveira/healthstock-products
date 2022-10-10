import { BaseEntity, EntitySchema } from "typeorm";

export default class Product extends BaseEntity{
    id; name; description; categoryId;

    constructor(body){
        super();
        this.name = body?.name;
        this.description = body?.description;
        this.categoryId = body?.categoryId;
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
        },
    },
    relations: {
        category: {
            type: 'many-to-one',
            target: 'Category',
            joinColumn: {
                name: 'category_id'
            },
            cascade: true,
            inverseSide: 'product'
          },
    }
})