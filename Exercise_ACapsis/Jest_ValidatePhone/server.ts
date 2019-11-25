import express from "express";

const app = express();

app.get("/", (req,res, next)=>{
    res.send("you look like a monkey")
})

app.listen(8091, ()=>{console.log(`server started at ${new Date().toLocaleTimeString}`)});