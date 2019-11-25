"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Store {
}
exports.default = Store;
Store.users = [];
Store.events = [];
Store.generateUserId = () => {
    let sorted = Store.users.sort((a, b) => {
        if (a.id > b.id)
            return -1;
        else if (a.id < b.id)
            return 1;
        else
            return 0;
    });
    return sorted[0].id + 1;
};
