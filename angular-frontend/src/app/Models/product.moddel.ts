export class Product {
    constructor(
        public title: string,
        public description: string,
        public price: string,
        public company: string,
        public person?: string,
        public _id?: string
    ){}
}