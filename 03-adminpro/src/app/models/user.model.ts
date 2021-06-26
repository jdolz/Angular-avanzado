import { environment } from "src/environments/environment";

const base_url = environment.base_url;

export class User {
    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public uid?: string
    ) { }

    get imageUrl(): string {

        if(this.img.includes('https')){
            return this.img;
        }
        if (this.img) {
            return `${base_url}/upload/user/${this.img}`;
        }else {
            return `${base_url}/upload/user/no-img.jpg`;
        }
    }
}