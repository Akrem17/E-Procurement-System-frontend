import { ADDRESS } from "./ADDRESS"
import { INSTITUTE } from "./INSTITUTE"
import { REPRESENTATIVE } from "./REPRESENTATIVE"
import { TENDER_CLASSIFICATION } from "./TENDER_CLASSIFICATION"

export class TENDER {
    public id!: string
    public name!: string
    public businessKind!: string
    public financing!: string
    public budget!: string
    public startDate!: string
    public deadLine!: string
    public evaluationMethod!: string
    public departement!: string
    public addressReceiptId!: number
    public AddressReceipt!: ADDRESS
    public responsibleId!: number
    public Responsible!: REPRESENTATIVE
    public instituteId!: number
    public tenderClassification!: TENDER_CLASSIFICATION[]
    public specificationURL!: string
    public institute!: INSTITUTE

    

}