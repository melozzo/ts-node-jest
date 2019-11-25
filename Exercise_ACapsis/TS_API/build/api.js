"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const moment_1 = __importDefault(require("moment"));
const store_1 = __importDefault(require("./store"));
var Api;
(function (Api) {
    Api.getEvents = (req, res, next) => {
        res.status(200).json(store_1.default.events);
    };
    Api.getUserEvents = (req, res, next) => {
        const id = parseInt(req.params.id);
        const userEvents = store_1.default.events.find(e => { return e.userid === id; });
        res.status(200).json(userEvents);
    };
    Api.getLastDayEvents = (req, res, next) => {
        const sortedByDateEvents = store_1.default.events.sort(sortDateDescending);
        const lastEventDate = sortedByDateEvents[0].created;
        const mostRecentEvents = store_1.default.events.filter((e) => {
            let eventDate = moment_1.default(e.created.toISOString());
            let lastDate = moment_1.default(lastEventDate.toISOString());
            return eventDate.isSame(lastDate, "day");
        });
        res.status(200).json(mostRecentEvents);
    };
    Api.createUser = (req, res, next) => {
        if (!req.body.email || !req.body.password)
            res.status(400).send("unable to create user, email and password are required");
        else if (!isValidEmail(req.body.email))
            res.status(400).send("bad naughty email already exists");
        else {
            let phone;
            if (req.body.phone && isValidPhone(req.body.phone))
                phone = req.body.phone;
            const id = store_1.default.generateUserId();
            const user = new models_1.Models.User(id, req.body.email, req.body.password, phone);
            store_1.default.users.push(user);
            res.status(201).send("user created good job");
        }
    };
    const isValidPhone = (phoneNumber) => {
        const isMatch = RegExp('^[2-9]\d{2}-\d{3}-\d{4}$').test(phoneNumber);
        return isMatch;
    };
    const isValidEmail = (emailAddress) => {
        let isValid = true;
        const found = store_1.default.users.find((e) => {
            return e.email === emailAddress;
        });
        if (found)
            isValid = false;
        return isValid;
    };
    Api.createEvent = (req, res, next) => {
        let jdate = new Date(req.body.created);
        console.log(jdate.toISOString());
        const event = new models_1.Models.Event(req.body.userid, req.body.type, jdate);
        if (event)
            console.log(event.created.toLocaleDateString());
        store_1.default.events.push(event);
        res.status(201).send("event has been added");
    };
    function sortDateDescending(a, b) {
        let aDate = moment_1.default(a.created.toISOString());
        let bDate = moment_1.default(b.created.toISOString());
        if (aDate.isAfter(bDate))
            return -1;
        else if (aDate.isBefore(bDate))
            return 1;
        else
            return 0;
    }
})(Api = exports.Api || (exports.Api = {}));
