export class UserModel {
    constructor(
        public id: number,
        public first_name: string,
        public second_name: string,
        public business_name: string | null,
        public email: string,
        public phone_number: string,
        public type: number,
        public approved: number,
        public banned: number,
        public ban_reason: string | null,
        public latitude: number,
        public longitude: number,
        public address: string,
        public profile_picture_url: string,
        public banner_url: string,
        public banner: string, // This duplicates can be reduce on one specific
        public profile_picture: string
    ) {}
}