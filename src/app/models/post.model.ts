export class PostModel {
    constructor(
        public id: number,
        public heading: string,
        public subheading: string,
        public text: string,
        public image: string
    ) {}
}