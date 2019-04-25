// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Hola, veo que es tu primera vez reciclando con Alexa, puedes preguntarme cómo reciclar un producto o qué impacto ambiental tiene sus residuos, ';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const RecycleQueryIntentHandler ={
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'recycleQueryIntent';
    },
    handle(handlerInput) {
        
        let speechText = "";
        let value = handlerInput.requestEnvelope.request.intent.slots.material.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        
        switch (value){
            case "papel": 
                speechText = "Casi todo el papel puede ser reciclado, junta todos tus desechos de papel y llévalo a un centro de acopio";
                break;
            case "periodico":
                speechText = "El periodico puede ser molido con un poco de agua para hacer papel reciclado en casa";
                break;
            case "tetrapack":
                speechText = "El tetrapack puede ser separado mediante agitación, enjuagalo bien y déjalo reposar en agua, despúes agítalo para separar el plástico papel y aluminio";
                break;
            case "vidrio":
                speechText = "El vidrio puede fundirse para hacer nuevos productos, manéjalo con cuidado y pónlo en un contenedor separado del resto de tu basura";
                break;
            case "pet":
                speechText = "Los plásticos PET son áltamente reciclables, lávalo bien y separalo del resto de las botellas, hay muchas campañas para su reciclaje";
                break;
            case "lata":
                speechText = "El aluminio y otros metales son excelentes candidatos para reciclar, pueden ser reciclados muchas veces sin perder sus propiedades. Después de ser recolectados pueden ser comprimidos y fundidos para reutilizarse";
                break;
            default:
                speechText = "¡Oh no! no sé cómo reciclarlo, pero lo investigaré y prónto podrás preguntarme de nuevo";
                break;
        }
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const QueryImpactIntentHandler ={
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'queryImpactIntent';
    },
    handle(handlerInput) {
        
        let speechText = "";
        let value = handlerInput.requestEnvelope.request.intent.slots.material.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        
        switch (value){
            case "papel": 
                speechText = "Cada año se pierden 15.000 millones árboles, y si siguen así las cosas en 300 años los borraremos del planeta provocando no solo la pérdida de hábitat para especies protegidas o la desaparición de flora, sino también supone un gran daño para el equilibrio del ciclo hídrico a nivel regional y mundial.";
                break;
            case "periodico":
                speechText = "Este elemento ya no se recicla porque ya ha sido tratado con tintas, las cuales contienen plomo, y en ocasiones el papel en el que se imprime ya es reciclado";
                break;
            case "tetrapack":
                speechText = "Los empaques de Tetra Pak tienen propiedades para dar lugar a un impacto ambiental y social positivo. Está hecho de un material compuesto por seis capas, que mantienen los alimentos en optimas condiciones, y que permiten que los empaques sean reciclados y reutilizados de manera fácil y segura. Sin embargo, si no es reciclado correctamente tarda en degradarse hasta 35 años, la combinación de capas de plástico, papel y aluminio lo hacen muy resistente";
                break;
            case "vidrio":
                speechText = "El vidrio es un material reutilizable y 100% reciclable. Si para fabricar un envase de vidrio se utiliza vidrio reciclado en un 90%, se puede ahorrar hasta un 75% de la energía que se necesitaria si se utilizara vidrio virgen.";
                break;
            case "pet":
                speechText = "La gran mayoría de las botellas de plástico están hechas de polietileno (PET), producido a base de petróleo, la extracción del cual es una enorme fuente de emisiones de gases de efecto invernadero. Además, la producción de plástico genera gases tóxicos que acaban emitiéndose a la atmósfera.";
                break;
            case "plastico":
                speechText = "A nivel mundial, se calcula que 25 millones de toneladas de plásticos se acumulan en el ambiente cada año y pueden permanecer inalterables por un periodo de entre 100 y 500 años. Esto se debe a que su degradación es muy lenta y consiste principalmente en su fragmentación en partículas más pequeñas, mismas que se distribuyen en los mares (en estos se han encontrado entre 3 a 30 kg/km2), ríos, sedimentos y suelos, entre otros.";
                break;
            default:
                speechText = "No tengo información sobre ese producto, pero lo investigaré y prónto podrás preguntarme de nuevo";
                break;
        }
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'Puedes preguntar cómo reciclar un producto o qué impacto ambiental tiene sus residuos';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
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
        const speechText = 'Nos vemos, espero que sigas reciclando!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Lo siento, no pude entender lo que dijiste, inténtalo de nuevo.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        RecycleQueryIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
