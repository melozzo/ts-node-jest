import moment from 'moment'

export namespace Models {

    export class User {
        id:number;
        email:string;
        password:string;
        phone?:string;

        constructor(id:number,email:string,password:string,phone?:string){
            this.id = id;
            this.email=email;
            this.password=password;
            if(phone)
            this.phone=phone;
        }
    }

    export enum EventType {
        "LOGIN" = "login",
        "CHARGE"="charge",
        "RECYCLE" ="recycle",
        "GROW"="grow"
     }
 
     export class Event {
         userid:number;
         type:string;
         created:Date;
     
         constructor(userid:number,type:string,created:Date) {
             this.userid=userid;
             this.type=type;            
             this.created= created;
         }
     
     }
}