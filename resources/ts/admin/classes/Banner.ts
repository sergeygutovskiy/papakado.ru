export default class Banner {
    id: number
    image_path: string
    order: number

    constructor({
        id,
        image_path,
        order
    } : {
        id: number,
        image_path: string,
        order: number,
    }) {
        this.id = id;
        this.image_path = image_path;
        this.order = order;
    }
}