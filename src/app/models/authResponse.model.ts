export class AuthResponseModel {
    constructor(
        public message: string,
        public status: boolean,
        public token?: string,
        public user_id?: number
    ) {}  
}