import { INSTITUTE } from "./INSTITUTE";
import { OFFER } from "./OFFER";

export class NOTIFICATION {

    public id!: number;
    public offerId!: number;
    public offer !: OFFER;
    public instituteId !: number;  
    public institute !: INSTITUTE;  
    public message !: string;  
    

}