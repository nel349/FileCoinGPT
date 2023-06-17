

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import lighthouse from '@lighthouse-web3/sdk'

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
        try {

            const { address } = req.body;
            const uploads = await lighthouse.getUploads(address);
            console.log("uploads: ", uploads);

            res.status(200).json(uploads.data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }

}

