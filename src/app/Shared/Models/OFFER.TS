import { TENDER } from "./TENDER"
import { SUPPLIER } from "./SUPPLIER"
import { SPECIFICATION } from "./SPECIFICATION";


export class OFFER {

    public id:number;
    public name:string;
    public totalMontant:number;
    public finalTotalMontant:number;
    public isAccepted:boolean;
    public supplierId:number;
    public supplier:SUPPLIER=null;
    public tenderId:number;
    public tender:TENDER=null;
    public tenderInfo:TENDER=null;
    public files!:SPECIFICATION[];
    



}