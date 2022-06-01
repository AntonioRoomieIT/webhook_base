const RequestHandler = require("../Lex/Request/RequestHandler.js");

function UpperFirstLetter(word) {
    return word[0].toUpperCase() + word.slice(1);
}

function handlerOfsessionAttributes(event, intentName = "", values = {}) {
    var sessionAttributes = {};
    console.log(values)
    if (RequestHandler.getSessionAttributes(event) == undefined) {
        sessionAttributes.previousIntent = intentName;
    } else {
        var attrs = RequestHandler.getSessionAttributes(event);
        Object.entries(attrs).forEach(([key, value]) => {
            sessionAttributes[key] = value;
        })
        sessionAttributes.previousIntent = intentName;
    }
    if (values != {}) {
        Object.entries(values).forEach(([key, value]) => {
            sessionAttributes[key] = value;
        })
    }
    console.log("sessionAttributes:");
    console.log(sessionAttributes);
    return sessionAttributes;

}

module.exports = { UpperFirstLetter, handlerOfsessionAttributes };