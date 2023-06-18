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

interface DynamicComponentProps {
  component?: FC;
  url?: string;
  data?: any;
}

const DynamicComponent: FC<DynamicComponentProps> = ({ url }) => {
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey"));
  const [isConnected, setIsConnected] = useState(false);

  const { dynamicAction, setDynamicAction } = useContext(MyContext);

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
      case "listType1":
        return (
          <div style={{ marginBottom: '16px' }}>
            <FileList apiKey={apiKey} />
          </div>
        );
      case "makeDealComponentType":
        return (
          <div style={{ marginBottom: '16px' }}>
            <DealProposalForm onSubmit={makeDealProposal} />
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
      default:
        return null;
    }
  };

  if (url !== undefined && url !== null && url !== '' && url !== "empty") {
    console.log("url:", url);
    return <iframe src={url} />;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isConnected ? (
          <div style={{ backgroundColor: '#0070f3', color: '#fff', padding: '8px', borderRadius: '4px', marginLeft: '16px' }}>
            Connected to LightHouse: ****{apiKey.slice(-4)}
            <button onClick={handleDisconnect} style={{ backgroundColor: '#fff', color: '#0070f3', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '8px', marginLeft: '16px' }}>Disconnect</button>
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