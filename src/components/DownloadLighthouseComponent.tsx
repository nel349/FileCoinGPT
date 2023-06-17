import React from "react";
import lighthouse from '@lighthouse-web3/sdk';

function LighthouseDownload() {

  const progressCallback = (progressData: any) => {
    const total = progressData?.total as number;
    const uploaded = progressData?.uploaded as number;
    const percentageDone = 100 - (total / uploaded);
    console.log(percentageDone);
  };

  const downloadFile = async(file) =>{
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    try {
        const output = await lighthouse.upload(file, process.env.LIGHTHOUSE_API_KEY, progressCallback);
        console.log('File Status:', output);
        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
    } catch (error) {
        console.log('Error:', error);
    }

    /*
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

      
  }

  return (
    <div className="App">
      <button onClick={() =>
        {

        }
      }/>
    </div>
  );
}

export default LighthouseDownload;