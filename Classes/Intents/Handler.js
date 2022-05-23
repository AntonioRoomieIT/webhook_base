async function handlerOfIntents(event, context, callback) {
  const ResponsesHandler = require("../Lex/Responses/ResponsesHandler.js");
  const PivotFunctions = require("../Pivot/PivotFunctions.js");
  const RequestHandler = require("../Lex/Request/RequestHandler.js");

  var fullFillmentState = "",
    msgContent = [], msgQuery = "",
    intentName = RequestHandler.getIntentName(event);


  switch (intentName) {
    case "welcome":
      fullFillmentState = "Fulfilled";
      msgQuery = "Hola, soy climabot, te ayudare a saber el clima de algunas ciudades del mundo.";
      msgQueryTwo = "Pero primero, por favor dime ¿Como te llamas?";
      msgContent = [
        {
          contentType: "PlainText",
          content: msgQuery,
        },
        {
          contentType: "PlainText",
          content: msgQueryTwo,
        },
      ];
      var sessionAttributes = PivotFunctions.handlerOfsessionAttributes(event, intentName)
      console.log(event);
      return ResponsesHandler.PlainTextResponse(
        "Close",
        "Confirmed",
        intentName,
        fullFillmentState,
        msgContent,
        sessionAttributes
      );
      break;
    case "weather":
      const axios = require("axios");
      var theCity = event.sessionState.intent.slots.City.value.interpretedValue;
      const appid = "cc42a9531948539acce159a38b56f5cf",
        baseURI = "https://api.openweathermap.org/data/2.5/weather?",
        url = baseURI + "q=" + theCity + "&appid=" + appid;
      const response = await axios.get(url);
      const data = response.data;
      fullFillmentState = "Fulfilled";
      msgQuery =
        "La temperatura de " + theCity + " es de " + data.main.temp + " °F";


      msgContent = [
        {
          contentType: "PlainText",
          content: msgQuery,
        },
      ];

      var sessionAttributes = PivotFunctions.handlerOfsessionAttributes(event, intentName, { weather: data.main.temp })
      console.log(event);

      return ResponsesHandler.PlainTextResponse("Close", "Confirmed", intentName, fullFillmentState, msgContent, sessionAttributes);
      break;
    case "getOptions":
      fullFillmentState = "Fulfilled";
      return ResponsesHandler.CardResponse(
        "Close",
        "Confirmed",
        intentName,
        fullFillmentState,
        "Sobre que pais deseas saber el clima",
        "Selecciona una opcion",
        "https://serverless-deploy-dev-serverlessdeploymentbucket-11icthea6npra.s3.amazonaws.com/serverless/serverless-deploy/dev/nrNBtS5c_400x400.jpg",
        [
          {
            text: "Pune",
            value: "Cual es el clima de pune",
          },
          {
            text: "London",
            value: "Cual es el clima de london",
          }
        ]
      );

      break;
    case "get_name":
      var NombrePersona = PivotFunctions.UpperFirstLetter(event.sessionState.intent.slots.nombrePersona.value.originalValue);
      fullFillmentState = "Fulfilled";
      msgQuery = "Mucho gusto " + NombrePersona + " ¿de que pais te gustaria saber el clima?";
      msgContent = [
        {
          contentType: "PlainText",
          content: msgQuery,
        },
      ];
      var sessionAttributes = PivotFunctions.handlerOfsessionAttributes(event, intentName, { nombre_persona: NombrePersona })
      console.log(event);
      return ResponsesHandler.PlainTextResponse(
        "Close",
        "Confirmed",
        intentName,
        fullFillmentState,
        msgContent,
        sessionAttributes
      );
    case "exit":
      fullFillmentState = "Fulfilled";
      msgQuery = "Ok, espero haber sido de ayuda, hasta luego.";
      msgContent = [
        {
          contentType: "PlainText",
          content: msgQuery,
        },
      ];
      var sessionAttributes = PivotFunctions.handlerOfsessionAttributes(event, intentName)
      console.log(event);
      return ResponsesHandler.PlainTextResponse(
        "Close",
        "Confirmed",
        intentName,
        fullFillmentState,
        msgContent,
        sessionAttributes
      );

      break;
  }
}

module.exports = { handlerOfIntents };
