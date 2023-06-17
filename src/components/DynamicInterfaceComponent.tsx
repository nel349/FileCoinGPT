import React, { FC, useState } from 'react';
import { Button, Input, Detail } from '../styles/components/DynamicInterfaceComponentStyles';
import LighthouseUpload from './UploadLighthouseComponent';
import { getApiKey } from '../wallet/getLighthouseApiKey';
import FileList from './FileListComponent';

interface DynamicComponentProps {
  component?: FC;
  url?: string;
  data?: any;
}

const DynamicComponent: FC<DynamicComponentProps> = ({ url, data }) => {

  const [apiKey, setApiKey] = useState('');

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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Input
              type="text"
              placeholder={componentData.inputTextField.placeholder}
            />
            <Button onClick={() => console.log(componentData.action)}>
              {componentData.label}
            </Button>
          </div>
        );
      case 'detailType1':
        return <Detail>{componentData.label}:{componentData.text}</Detail>;
      case 'VideoType1':
        return (
          <div
            // dangerouslySetInnerHTML={{ __html: `
            //   <video id="bunny-video" className="video-js vjs-16-9" data-setup='{}' controls controls width="640" height="360">
            //     <source src="/ipfs/QmS29VtmK7Ax6TMmMwbwqtuKSGRJTLJAmHMW83qGvBBxhV/bunny.m3u8" type="application/x-mpegURL" />
            //   </video>
            // `}}
          />
        );
        case 'ImageType1':
          return (
            <div>
              <img src={componentData.source} alt={componentData.alt} width={componentData.width} height={componentData.height} />
            </div>
          );
        case 'VideoType2':
          return (
            <video id="bunny-video" className="video-js vjs-16-9" data-setup='{}' controls width="640" height="360">
              <source src={componentData.source} />
            </video>
            
          );
        case "ApiKeyButton":
          return (
            <div>
              <Button onClick={async () =>
                {
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
            <div>
              <FileList apiKey={apiKey}/>
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
      {data.section1.map((componentData) => (
        <div key={componentData.name}>{renderComponent(componentData)}</div>
      ))}
      <LighthouseUpload apiKey={apiKey}/>
    </div>
  );
};

export default DynamicComponent;