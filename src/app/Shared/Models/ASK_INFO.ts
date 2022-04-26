import { CITIZEN } from "./CITIZEN";
import { TENDER } from "./TENDER";

  export class ASK_INFO{
      
    public information: string | null;
    public firstName: boolean| null;
    public lastName: string | null;
    public address: string | null;
    public fax: string | null;
    public email: string | null;
    public sendToEmail: boolean | null;
    public sendToChat: boolean | null;
    public sendToAddress: boolean | null;
    public citizenId: number | null;
    public tenderId: number | null;
    public citizen: CITIZEN | null;
    public tender: TENDER | null;
    


  }