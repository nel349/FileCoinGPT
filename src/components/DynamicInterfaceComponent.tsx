import React, { FC } from 'react';
import { Button, Input, Detail } from '../styles/components/DynamicInterfaceComponentStyles';
interface DynamicComponentProps {
  component?: FC;
  url?: string;
  data?: any;
}

const DynamicComponent: FC<DynamicComponentProps> = ({ url, data }) => {

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
            dangerouslySetInnerHTML={{ __html: `
              <video id="bunny-video" className="video-js vjs-16-9" data-setup='{}' controls controls width="640" height="360">
                <source src="/ipfs/QmS29VtmK7Ax6TMmMwbwqtuKSGRJTLJAmHMW83qGvBBxhV/bunny.m3u8" type="application/x-mpegURL" />
              </video>
            `}}
          />
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
    </div>
  );
};

export default DynamicComponent;