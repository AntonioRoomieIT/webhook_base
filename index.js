exports.handler = async (event, context, callback) => {
  "use strict";

  const IntentsHandler = require("Classes/Intents/Handler.js"), FallbacksHandler = require("Classes/Intents/FallbackHandler.js"),
    intentName = event.sessionState.intent.name;

  if (intentName === "FallbackIntent") {
    console.log("In FallbackIntent");
    const response = FallbacksHandler.handlerOfFallbacks(event, context, callback);
    console.log("--RESPONSE-- " + response);
    return response;
  } else {
    console.log("In " + intentName);
    const response = IntentsHandler.handlerOfIntents(event, context, callback);
    console.log("--RESPONSE-- " + response);
    return response;
  }
};
