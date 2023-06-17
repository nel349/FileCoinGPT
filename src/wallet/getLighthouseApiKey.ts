import lighthouse from '@lighthouse-web3/sdk'
import axios from 'axios'
import { walletClient } from './clients';

export const getApiKey = async() =>{
    const wallet = await walletClient();
    const currentAddress = (await wallet.requestAddresses()).at(0);
    const verificationMessage = (
        await axios.get(
            `https://api.lighthouse.storage/api/auth/get_message?publicKey=${currentAddress}`
        )
      ).data;


    const signature = await wallet.signMessage({
        message: { raw: verificationMessage },
        account: currentAddress,
    })

//   const signedMessage = await signAuthMessage(wallet.privateKey, verificationMessage)
  const response = await lighthouse.getApiKey(currentAddress, signature)
  console.log("APIKEY LightHouse:", response.data.apiKey);
  /* { data: { apiKey: '7d8f3d18.eda91521aa294773a8201d2a7d241a2c' } } */
  return response.data.apiKey;
}