import { BaseEntity, EntitySchema } from "typeorm";

export default class Category extends BaseEntity{
    id; name; description;

    constructor(body){
        super();
        this.name = body?.name;
        this.description = body?.description;
    }
}

export const Schema = new EntitySchema({
    name: "Category",
    tableName: "categories",
    target: Category,
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
    }
})