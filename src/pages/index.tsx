import ChatBoxComponent from '../components/ChatBoxComponent';
import DynamicComponent from '../components/DynamicInterfaceComponent';
import { containerStyle, leftPaneStyle, rightPaneStyle } from '../styles/indexStyles';
import sampleDynamicComponent from '../../src/components/sampleDynamicComponent.json';
import dotenv from 'dotenv';
import { SetStateAction, useState } from 'react';
dotenv.config();

const SplitScreen = () => {

  const [stateUrl, setStateUrl] = useState("empty");

  const storeUrl = (value: SetStateAction<string>) => {
    setStateUrl(value);
  };

  return (
    <div style={containerStyle}>
      <div style={leftPaneStyle}>
        <ChatBoxComponent setStoreUrl={storeUrl} />
      </div>
      <div style={rightPaneStyle}>
        <DynamicComponent data={sampleDynamicComponent} url={stateUrl} />
      </div>
    </div>
  );
};

export default SplitScreen;