export class TENDER_FILTERS {

    public bidNumber: string | null;
    public bidName: string| null;
    public city: string | null;
    public postDate: string | null;

  
    private isEmptyOrNull(str:string| null):boolean{
        if(str=="" || str==null)return true;
        return false;
        

    }
    isEmpty():boolean{
        if (this.isEmptyOrNull(this.bidName) && this.isEmptyOrNull(this.bidNumber) && this.isEmptyOrNull(this.city) &&  this.isEmptyOrNull(this.postDate) )
        return true;
        return false;
    }
}