// import * as fs from 'fs';
// import path from "path";
import { Configuration, OpenAIApi } from 'openai';

export const propertyExtractor = async (question: string) => {

    console.log("APIKEY: ", process.env.REACT_APP_OPENAI_API_KEY);

    const responseFetch = await fetch('/context.yaml');
    const context = await responseFetch.text();

    // console.log("context: " + text);

    // OpenAI API
    const configuration = new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY });
    delete configuration.baseOptions.headers['User-Agent'];
    const openai = new OpenAIApi(configuration);

    //this method is used to create a chat with the question and the context
    const questionToProperties = `Translate the following sentence into a json format: ${question}}`;

    //this method is used to create a chat with the question and the context
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": context },
            { "role": "user", "content": questionToProperties }
        ]
    });
    let choices = response?.data?.choices;
    let properties = choices[0]?.message?.content;

    properties= extractCodeBlocks(properties);
    // Remove leading and trailing characters
    const trimmedString = properties.trim();

    // Extract the JSON portion
    const jsonStartIndex = trimmedString.indexOf("{");
    const jsonEndIndex = trimmedString.lastIndexOf("}");
    const json = trimmedString.substring(jsonStartIndex, jsonEndIndex + 1);
    console.log("choice: ", choices);
    console.log("properties: ", JSON.parse(json));
    // console.log("property1 ", properties[0]);
};

function extractCodeBlocks(text: string) {
    // Define a regular expression to match code blocks enclosed by triple backticks
    const regex = /```([\s\S]*?)```/g;
    // Initialize an array to store the extracted code blocks
    const codeBlocks = []
  
    // Use the RegExp.exec() method to find all matches in the input text
    let match;
    while ((match = regex.exec(text)) !== null) {
      // The first capturing group contains the content between the triple backticks
      const codeBlock = match[1];
      codeBlocks.push(codeBlock);
    }
  
    return codeBlocks[0] ? codeBlocks[0].toString() : text;
  }