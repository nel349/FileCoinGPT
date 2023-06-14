// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import { ethers } from 'ethers';
import { Configuration, OpenAIApi } from 'openai';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const referer = req.headers.referer || req.headers.referrer; // get the referer from the request headers

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method should be POST' });
    } else if (process.env.NODE_ENV !== "development") {
        if (!referer || referer !== process.env.APP_URL) {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
    else {
        let context = "";

        try {
            context = fs.readFileSync(path.resolve('', 'public/context.md'), 'utf8')
            // console.log("context: ", context);
        } catch (error) {
            console.log("error: ", error);
        }

        try {
            // console.log("req.body: ", req.body);
            const { ensName } = req.body;
            const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_KEY_MAINNET);
            const address = await provider.resolveName(ensName);

            const ensResult = {
                address: address,
                url: `https://app.ens.domains/${address}`,
                urlContents: `The contents of the url`,
                summary: `This is the address of ${ensName}`,

            };

            try {
                const parsedEnsResult = JSON.stringify(ensResult);
                console.log("ensResult: ", parsedEnsResult);
                const body = `Describe values of the following JSON response: ${parsedEnsResult}`;

                const configuration = new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY});
                delete configuration.baseOptions.headers['User-Agent'];
                const openai = new OpenAIApi(configuration);


                //this method is used to create a chat with the question and the context
                const response = await openai.createChatCompletion({
                  model: "gpt-3.5-turbo",
                  messages:[
                    {"role": "system", "content": context},
                    {"role": "user", "content": body }
                  ]
                });

                let choices = response?.data?.choices;
                let message = choices[0]?.message?.content;


                console.log("message ENS Solve OK: ", message);
                res.status(200).json(message);
            } catch (error) {
                console.log("ERROR: ENS RESOLVE RESPONSE: ", error);
                res.status(500).json({ message: "Something went wrong with the response" });
            }

            // console.log("address: ", address);
            // res.status(200).json(address);
        } catch (error) {
            console.log(error);
            res.status(200).json({ message: "Something went wrong" });
        }
    }

}
