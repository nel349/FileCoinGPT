// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
                url: `https://app.ens.domains/${ensName}`
            };

            try {
                const parsedEnsResult = JSON.stringify(ensResult);
                console.log("ensResult: ", parsedEnsResult);
                const body = `Give user a summary of the results for the requested ENS name: ${parsedEnsResult}`;

                const configuration = new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY});
                delete configuration.baseOptions.headers['User-Agent'];
                const openai = new OpenAIApi(configuration);


                //this method is used to create a chat with the question and the context
                // const response = await openai.createCompletion({
                //     model: "text-davinci-002",
                //     prompt: `${context}\n${body}`,
                //     maxTokens: 1024,
                //     n: 1,
                //     stop: "\n",
                //     temperature: 0.7,
                //     engine: "davinci"
                //   });

                  const response = await openai.createCompletion({
                    model: 'text-davinci-003',
                    prompt: `${body}`,
                    temperature: 0.5,
                    max_tokens: 2048
                });

                let choices = response?.data?.choices;
                let message = choices[0]?.text;


                console.log("message ENS Solve OK: ", choices);
                res.status(200).json({message, url: ensResult.url});
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
