import {Models} from './models';


export default class Store {

    static users:Models.User[]=[];
    static events:Models.Event[]=[];

    static generateUserId = ()=>{

       let sorted =  Store.users.sort( (a:Models.User,b:Models.User)=>{
            if(a.id > b.id)
            return -1;
            else if ( a.id < b.id )
            return 1;
            else return 0;
        })

        return sorted[0].id + 1;

    } 


}