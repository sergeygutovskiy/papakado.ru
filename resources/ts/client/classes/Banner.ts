export default class Banner {
    id: number
    image_path: string

    constructor({ id, image_path } : { id: number, image_path: string }) {
        this.id = id;
        this.image_path = image_path;
    }
}