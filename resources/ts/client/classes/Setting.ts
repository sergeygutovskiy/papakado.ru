export default class Setting {
    slug: string
    value: string
    
    constructor({ slug, value } : { slug: string, value: string }) {
        this.slug = slug;
        this.value = value;
    }
}