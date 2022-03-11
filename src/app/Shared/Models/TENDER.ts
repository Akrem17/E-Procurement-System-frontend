import { ADDRESS } from "./ADDRESS"
import { REPRESENTATIVE } from "./REPRESENTATIVE"
import { TENDER_CLASSIFICATION } from "./TENDER_CLASSIFICATION"

export class TENDER {

    public name!: string
    public businessKind!: string
    public financing!: string
    public budget!: string
    public startDate!: string
    public evaluationMethod!: string
    public guaranteeType!: string
    public departement!: string
    public addressReceiptId!: number
    public AddressReceipt!: ADDRESS
    public responsibleId!: number
    public Responsible!: REPRESENTATIVE
    public instituteId!: number
    public tenderClassification!: TENDER_CLASSIFICATION
    public specificationURL!: string


}