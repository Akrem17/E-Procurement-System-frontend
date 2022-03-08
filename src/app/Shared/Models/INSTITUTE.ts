import { ADDRESS } from "./ADDRESS";
import { REPRESENTATIVE } from "./REPRESENTATIVE";
import { USER } from "./USER";

export class INSTITUTE extends USER{
    public nameFr!: string
    public nameAr!: string
    public typeOfInstitute!: string
    public areaType!: string
    public representativeName!: string
    public notificationEmail!: string
    public phone!: string
    public fax!: string
    public address!: ADDRESS
    public interlocutor!:REPRESENTATIVE
} 