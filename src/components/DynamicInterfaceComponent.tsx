import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Input, Detail } from '../styles/components/DynamicInterfaceComponentStyles';
import LighthouseUpload from './UploadLighthouseComponent';
import { getApiKey } from '../wallet/getLighthouseApiKey';
import FileList from './FileListComponent';
import DealProposalForm from './DealProposalFormComponent';
import GetExistingDealProposalDetails from './GetExistingDealProposalComponent';
import { makeDealProposal,  } from '../fevm/make-deal-proposal';
import { fetchDealProposal } from '../fevm/get-deal-proposal';
import { Address } from 'viem';
import ApiKeyButton from './ApiKeyButton';
import { MyContext } from '../pages';
import IFrameComponentNoSSR from './IFrameComponentNoSSR';
import ENSProfileComponent from './ENSComponent';

interface DynamicComponentProps {
  component?: FC;
  url?: string;
  data?: any;
}

const DynamicComponent: FC<DynamicComponentProps> = ({ url }) => {
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey"));
  const [isConnected, setIsConnected] = useState(false);

  const { dynamicAction, setDynamicAction, setChatLog } = useContext(MyContext);

  useEffect(() => {
    const storedApiKey = localStorage.getItem("apiKey");

    if (storedApiKey) {
      setApiKey(storedApiKey);
      setIsConnected(true);
    }
  }, []);

  const handleConnect = async (newApiKey: string) => {
    const key = await getApiKey()
    setApiKey(key);
    localStorage.setItem("apiKey", key);
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setApiKey(null);
    localStorage.removeItem("apiKey");
    setIsConnected(false);
  };

  const renderComponent = (componentData) => {
    switch (componentData.type) {
      case 'actionButton1':
        return (
          <Button onClick={() => console.log(componentData.action)}>
            {componentData.label}
          </Button>
        );
      case 'actionButton2':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
            <Input
              type="text"
              placeholder={componentData.inputTextField.placeholder}
              style={{ marginBottom: '8px' }}
            />
            <Button onClick={() => console.log(componentData.action)}>
              {componentData.label}
            </Button>
          </div>
        );
      case 'detailType1':
        return <Detail>{componentData.label}: {componentData.text}</Detail>;
      case 'ImageType1':
        return (
          <div style={{ marginBottom: '16px' }}>
            <img src={componentData.source} alt={componentData.alt} width={componentData.width} height={componentData.height} />
          </div>
        );
      case 'VideoType2':
        return (
          <div>
            <video id="bunny-video" className="video-js vjs-16-9" data-setup='{}' controls width="640" height="360">
              <source src={componentData.source} />
            </video>
          </div>
        );
      case "ApiKeyButton":
        return (
          <div style={{ marginBottom: '16px' }}>
            <Button onClick={async () => {
              console.log("fetching lighthouse api key...");
              setApiKey(await getApiKey());
            }
            }>
              {componentData.label}
            </Button>
          </div>
        );
      case "viewFilesCarFilesType":
        return (
          <div style={{ marginBottom: '16px' }}>
            <FileList apiKey={apiKey} />
          </div>
        );
      case "makeDealComponentType":
        return (
          <div style={{ marginBottom: '16px' }}>
            <DealProposalForm onSubmit={async () => {

                //REMOVE THIS: JUST FOR TESTING
                  const params = {
                    contract: "0xFd562F20E65e0d87598cDA7F2a1Ac348a008fA0D",
                    pieceCid: "baga6ea4seaqhedb2m6yyr4wejjgxrrehujv5yp6ujzgebqaz22qlm6v74apw6oq",
                    pieceSize: 4096,
                    verifiedDeal: false,
                    label: "file-1686957219783.png",
                    startEpoch: 100000,
                    endEpoch: 1000000,
                    storagePricePerEpoch: 0,
                    providerCollateral: 0,
                    clientCollateral: 0,
                    extraParamsVersion: "1",
                    locationRef: "https://data-depot.lighthouse.storage/api/download/download_car?fileId=c52f62f1-dd4d-4f02-8352-2af72442818d.car",
                    carSize: 2061,
                    skipIpniAnnounce: false,
                    removeUnsealedCopy: false,
                }
              const {message} = await makeDealProposal(params);
              // dynamicAction.section1[0].proposalResponse = message;
              setChatLog((prevChatLog) => [
                ...prevChatLog,
                {
                  type: "bot",
                  message: message,
                },
              ]);
              setDynamicAction(dynamicAction);
            }} />
          </div>
        );
      case "GetDealProposalTypeButton":
        return (
          <div style={{ marginBottom: '16px' }}>
            <GetExistingDealProposalDetails onSubmit={fetchDealProposal} />
          </div>
        );
      case "lighthouseUploadType":
        return (
          <div style={{ marginBottom: '16px' }}>
            <LighthouseUpload apiKey={apiKey} style={{ marginBottom: '16px' }} />
          </div>
        );
      case "ENSProfileNameType":
        return (
          <ENSProfileComponent/>
        );

      default:
        return null;
    }
  };

  // if (url !== undefined && url !== null && url !== '' && url !== "empty") {
  //   console.log("url:", url);
  //   return <IFrameComponentNoSSR src={url} />;
  // }

  return (
    <div>
      <div style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%' }}>
        {isConnected ? (
          <div style={{ backgroundColor: '#0070f3', color: '#fff', padding: '8px', borderRadius: '4px', marginLeft: '16px' }}>
            Connected to LightHouse: ****{apiKey.slice(-4)}
            <button onClick={handleDisconnect} style={{ backgroundColor: '#fff', color: '#0070f3', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '8px', marginLeft: '72px' }}>Disconnect</button>
          </div>
        ) : <ApiKeyButton handleClick={handleConnect} />}
      </div>
      <div>
        {dynamicAction?.section1?.map((componentData: any) => (
          <div key={componentData.name}>{renderComponent(componentData)}</div>
        ))}
      </div>
    </div>
  );
};

export default DynamicComponent;