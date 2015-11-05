/**
 * Created by daniel on 05.11.15.
 */

let registeredHandlers = [];

module.exports = {
    register: (handler) => registeredHandlers.push(handler),
    notify: (eventType, comment) => registeredHandlers.forEach(handler => handler(eventType, comment))
};
