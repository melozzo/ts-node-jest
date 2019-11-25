
import express,{RequestHandler} from "express";
import { Models } from './models'
import moment from "moment";
import Store from './store'

export namespace Api {



    export const getEvents:RequestHandler = ( req, res, next )=>{
        res.status(200).json( Store.events )
    }

    export const getUserEvents:RequestHandler =  (req,res,next) =>{
        const id = parseInt(req.params.id);
        const userEvents = Store.events.find( e => { return e.userid === id})
        res.status(200).json( userEvents);
    }

    export const getLastDayEvents:RequestHandler = ( req, res, next)=>{
        const sortedByDateEvents = Store.events.sort( sortDateDescending);
        const lastEventDate = sortedByDateEvents[0].created;
        const mostRecentEvents = Store.events.filter((e:Models.Event)=>{
           let eventDate = moment(e.created.toISOString());
           let lastDate = moment(lastEventDate.toISOString())
            return eventDate.isSame(lastDate,"day")
        })
        res.status(200).json( mostRecentEvents)
    }

    export const createUser:RequestHandler = (req,res,next)=>{

        if(!req.body.email || !req.body.password)
         res.status(400).send("unable to create user, email and password are required");

        else if( ! isValidEmail(req.body.email))
            res.status(400).send("bad naughty email already exists");
        else 
        {
            let phone;
            if(req.body.phone && isValidPhone(req.body.phone) )
                phone = req.body.phone;

            const id = Store.generateUserId();
            const user = new Models.User( id, req.body.email, req.body.password, phone);
            Store.users.push(user)
            res.status(201).send("user created good job")
        }       
    }

    const isValidPhone = (phoneNumber:string)=>{
       
       const isMatch =  RegExp('^[2-9]\d{2}-\d{3}-\d{4}$').test(phoneNumber);
       return isMatch;

    }

    const isValidEmail=(emailAddress:string)=>{
        let isValid = true;
        const found = Store.users.find(( e:Models.User )=>{
            return e.email === emailAddress
        });

        if(found)
            isValid = false;

        return isValid
    }

    export const createEvent: RequestHandler = (req,res,next)=>{

        let jdate = new Date(req.body.created);
        console.log(jdate.toISOString());

        
        const event = new Models.Event( req.body.userid, req.body.type,jdate)
        if(event)
            console.log(event.created.toLocaleDateString())
        Store.events.push(event)
        res.status(201).send("event has been added")
    }

    function sortDateDescending(a:Models.Event,b:Models.Event){

        let aDate = moment(a.created.toISOString());
        let bDate = moment(b.created.toISOString());
        
        if(aDate.isAfter(bDate) )
            return -1;
        else if ( aDate.isBefore(bDate) )
            return 1;
        else    
            return 0;
    }


}