export default class Category {
    id: number
    slug: string
    name: string
    
    constructor({ id, slug, name } : { id: number, slug: string, name: string }) {
        this.id = id;
        this.slug = slug;
        this.name = name;
    }
}