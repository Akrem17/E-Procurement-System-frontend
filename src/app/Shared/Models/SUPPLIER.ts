import { ADDRESS } from "./ADDRESS"
import { LICENCE } from "./LICENCE"
import { REPRESENTATIVE } from "./REPRESENTATIVE"
import { USER } from "./USER"

export class SUPPLIER extends USER  {

   
    
    public supplierName!: string
    public category!: string
    public registrationNumber!: string
    public registrationDate!: string
    public taxId!: string
    public cnssId!: string
    public buisnessClassification!: string
    public buisnessType!: string
    public replyEmail!: string
    public companyName!: string
    public phone!: string
    public fax!: string
    public representative!:REPRESENTATIVE
    public representativeId!:number;
    public licenceId!:number;
    public licence!:LICENCE
    public addressId!:number;
    public address!:ADDRESS
    
 
}