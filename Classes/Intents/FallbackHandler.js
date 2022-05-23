async function handlerOfFallbacks(event, context, callback) {
  const ResponsesHandler = require("../Lex/Responses/ResponsesHandler.js");
  var fullFillmentState = "",
    msgContent = "", msgQuery = "",
    intentName = event.sessionState.intent.name;
  fullFillmentState = "Failed";
  msgQuery = "Entro a fallback";
  msgContent = [
    {
      contentType: "PlainText",
      content: msgQuery,
    },
  ];

  console.log(event['interpretations']);
  return ResponsesHandler.PlainTextResponse(
    "Close",
    "Confirmed",
    intentName,
    fullFillmentState,
    msgContent
  );
}

module.exports = { handlerOfFallbacks };
