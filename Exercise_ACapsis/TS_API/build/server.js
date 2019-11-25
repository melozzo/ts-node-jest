"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("./api");
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const jsonParser = body_parser_1.default.json();
app.get("/events", api_1.Api.getEvents);
app.get("/events/:id", api_1.Api.getUserEvents);
app.get("/recent", api_1.Api.getLastDayEvents);
app.post("/user", jsonParser, api_1.Api.createUser);
app.post("/event", jsonParser, api_1.Api.createEvent);
app.listen("8091", () => { console.log(`server started at ${new Date().toLocaleTimeString()}`); });
