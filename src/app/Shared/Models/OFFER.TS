import { TENDER } from "./TENDER"
import { SUPPLIER } from "./SUPPLIER"


export class OFFER {

    public id:number;
    public name:string;
    public description:string;
    public tender:TENDER;
    public supplier:SUPPLIER;



}