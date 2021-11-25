export default class Category {
    id: number
    name: string
    slug: string

    constructor({
        id,
        name,
        slug,
    } : {
        id: number,
        name: string,
        slug: string,
    }) {
        this.id = id;
        this.name = name;
        this.slug = slug;
    }
}