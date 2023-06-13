// import * as fs from 'fs';
// import path from "path";
import { Configuration, OpenAIApi } from 'openai';

export const propertyExtractor = async (question: string) => {

    console.log("APIKEY: ", process.env.REACT_APP_OPENAI_API_KEY);

    const responseFetch = await fetch('/context.yaml');
    const text = await responseFetch.text();

    // console.log("context: " + text);

    // OpenAI API
    const configuration = new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY });
    delete configuration.baseOptions.headers['User-Agent'];
    const openai = new OpenAIApi(configuration);

    //this method is used to create a chat with the question and the context
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": text },
            { "role": "user", "content": question }
        ]
    });
    let choices = response?.data?.choices;

    console.log(JSON.stringify(choices));
};