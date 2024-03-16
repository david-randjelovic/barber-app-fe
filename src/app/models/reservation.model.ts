export class ReservationModel {
    constructor(
        public date: Date,
        public clientName: string,
        public serviceType: string,
        public price: number
    ) {}
}