"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Models;
(function (Models) {
    class User {
        constructor(id, email, password, phone) {
            this.id = id;
            this.email = email;
            this.password = password;
            if (phone)
                this.phone = phone;
        }
    }
    Models.User = User;
    let EventType;
    (function (EventType) {
        EventType["LOGIN"] = "login";
        EventType["CHARGE"] = "charge";
        EventType["RECYCLE"] = "recycle";
        EventType["GROW"] = "grow";
    })(EventType = Models.EventType || (Models.EventType = {}));
    class Event {
        constructor(userid, type, created) {
            this.userid = userid;
            this.type = type;
            this.created = created;
        }
    }
    Models.Event = Event;
})(Models = exports.Models || (exports.Models = {}));
