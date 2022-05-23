function PlainTextResponse(typeDialog = "Close", confirmationSt = "Confirmed", intentName, fullFillmentState, msgContent = [{ contentType: "PlainText", value: "Disculpa, ¿podrias repetirme lo ultimo por favor?", },],sessionAttributesV={}) {
  console.log("** BUILD PLAIN TEXT RESPONSE **");
  let response =
  {
    sessionState: {
      dialogAction: {
        type: typeDialog,
      },
      intent: {
        confirmationState: confirmationSt,
        name: intentName,
        state: fullFillmentState,
      },
      sessionAttributes: sessionAttributesV
    },  
    messages: msgContent,
  };
  console.log("-- THE PLAIN TEXT RESPONSE IS -- " );
  console.log(response);
  return response;
}
function CardResponse(typeDialog = "Close", confirmationSt = "Confirmed", intentName, fullFillmentState, titlec, subtitlec, url, buttonsCard = [{ text: "Default", value: "DefaultValue", },]) {
  console.log("** BUILD CARD RESPONSE **");
  let response = {
    sessionState: {
      dialogAction: {
        type: typeDialog,
      },
      intent: {
        confirmationState: confirmationSt,
        name: intentName,
        state: fullFillmentState,
      },
    },
    messages: [
      {
        contentType: "ImageResponseCard",
        imageResponseCard: {
          title: titlec,
          subtitle: subtitlec,
          imageUrl: url,
          buttons: buttonsCard,
        },
      },
    ],
  };
  console.log("-- THE CARD RESPONSE IS -- " + response);
  return response;
}

module.exports = { PlainTextResponse, CardResponse };

