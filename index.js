const Alexa = require('ask-sdk-core');

const speechConsCorrect = ['Booya', 'All righty', 'Bam', 'Bazinga', 'Bingo', 'Boom', 'Bravo', 'Cha Ching', 'Cheers', 'Dynomite', 'Hip hip hooray', 'Hurrah', 'Hurray', 'Huzzah', 'Oh dear.  Just kidding.  Hurray', 'Kaboom', 'Kaching', 'Oh snap', 'Phew','Righto', 'Way to go', 'Well done', 'Whee', 'Woo hoo', 'Yay', 'Wowza', 'Yowsa'];
const speechConsWrong = ['Argh', 'Aw man', 'Blarg', 'Blast', 'Boo', 'Bummer', 'Darn', "D'oh", 'Dun dun dun', 'Eek', 'Honk', 'Le sigh', 'Mamma mia', 'Oh boy', 'Oh dear', 'Oof', 'Ouch', 'Ruh roh', 'Shucks', 'Uh oh', 'Wah wah', 'Whoops a daisy', 'Yikes'];

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    let userIdPassato= handlerInput.requestEnvelope.context.System.user.userId
    let userId= '1amzn1.ask.account.AFONY3OOIHPPZX3IKFOE5P3H2EW6TZ6UMCGMLZRDDZIPPI6P3NUVF44ZGDOCLBGM6WZV4P5WY44FWEY2PFAC3C524SNINDVXHAJF2NXAZ2KX25WVNQ2Q6URK2PJSD7Z5LUEJUTY6IUGRWU2CQWMFPRRVXBKB2MQTXAZSO4I7HJRSUPV4DTIG4NDR4AJ5D6TYJ6YKCDSGI7BMKNQ'
    let speechText='Benvenuto, sono Carson.';
    if(userId === userIdPassato)
    {
      speechText = 'Bentornato, come posso essere utile?';
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('Sto aspettando')
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
};


const HelloIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloIntent';
  },
  handle(handlerInput) {
    const speechText = 'Bentrovata mitica, <lang xml:lang="en-GB"> lady </lang>'
    + handlerInput.requestEnvelope.request.intent.slots.name.value;
    return handlerInput.responseBuilder
      .speak(speechText)
      //.reprompt(speechText)
      .withSimpleCard('Hello', speechText)
      .getResponse();
  }
};

const CiaoIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'CiaoIntent';
  },
  handle(handlerInput) {
    return HelloIntentHandler(handlerInput);
  }
 
};


const StartedPlanMyTripHandler = {
  canHandle(handlerInput){
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      request.intent.name === 'PlanMyTripIntent' &&
      request.dialogState === 'STARTED';
  },
  handle(handlerInput){
    const currentIntent = handlerInput.requestEnvelope.request.intent;       
    let fromCity = currentIntent.slots.fromCity;
    // fromCity.value is empty if the user has not filled the slot. In this example, 
    // getUserDefaultCity() retrieves the user's default city from persistent storage.
    if (!fromCity.value) {
      currentIntent.slots.fromCity.value = 'roma';
    }

    // Return the Dialog.Delegate directive
    return handlerInput.responseBuilder
      .addDelegateDirective(currentIntent)
      .getResponse();
  }
};

const InProgressPlanMyTripHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      request.intent.name === 'PlanMyTripIntent' &&
      request.dialogState === 'IN_PROGRESS';
  },
  handle(handlerInput) {
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    return handlerInput.responseBuilder
      .addDelegateDirective(currentIntent)
      .getResponse();
  },
};

const CompletedPlanMyTripHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && 
      request.intent.name === 'PlanMyTripIntent' &&
      request.dialogState === 'COMPLETED';
  },
  handle(handlerInput) {
    
      
      console.log('ok finito')
      const data = handlerInput.requestEnvelope.request.intent.slots.data_viaggio.value;
      const cittaDa = handlerInput.requestEnvelope.request.intent.slots.cittaFrom.value;
      const cittaTo = handlerInput.requestEnvelope.request.intent.slots.citta.value;
      const attivita = handlerInput.requestEnvelope.request.intent.slots.attivita.value;

      const speechText = 'Che bello hai deciso di andare a ' + cittaTo +' per '+attivita+'. Bene allora prenoto subito l\'albergo per il ' 
      + ' <say-as interpret-as="date">'+data+'</say-as> '
      ;
      return handlerInput.responseBuilder
      .speak(speechText)
      //.reprompt(speechText)
      .withSimpleCard('Hello', speechText)
      .getResponse();
    
  },
};


const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    //any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};


exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloIntentHandler,
    CiaoIntentHandler,
    StartedPlanMyTripHandler,
    InProgressPlanMyTripHandler,
    CompletedPlanMyTripHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();