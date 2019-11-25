import express from "express";
import { Api } from './api';
import bodyparser from 'body-parser'

const app = express();

const jsonParser = bodyparser.json();

app.get("/events", Api.getEvents);

app.get("/events/:id", Api.getUserEvents);

app.get("/recent",Api.getLastDayEvents);

app.post("/user",jsonParser, Api.createUser);

app.post("/event",jsonParser, Api.createEvent)

app.listen("8091",()=> { console.log(`server started at ${new Date().toLocaleTimeString() }`)});

