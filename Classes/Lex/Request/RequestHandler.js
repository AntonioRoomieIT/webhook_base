
function getIntentName(event) {
    return event.sessionState.intent.name;
}

function getSessionAttributes(event) {
    return event.sessionState.sessionAttributes;
}

module.exports = { getIntentName, getSessionAttributes };