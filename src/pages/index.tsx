import ChatBoxComponent from '../components/ChatBoxComponent';
import { containerStyle, leftPaneStyle, rightPaneStyle } from '../styles/indexStyles';
// import sampleDynamicComponent from '../../src/components/sampleDynamicComponent.json';
import dotenv from 'dotenv';
import { SetStateAction, createContext, useState } from 'react';
import DynamicComponentWithNoSSR from '../components/DynamicComponentWithNoSSR';
import React from 'react';
dotenv.config();

interface MyContextProps {
  dynamicAction: any;
  setDynamicAction: any;
}
export const MyContext = createContext<MyContextProps>({
  setDynamicAction: {},
  dynamicAction: {},
});

const SplitScreen = () => {

  const [stateUrl, setStateUrl] = useState("empty");

  const [dynamicAction, setDynamicAction] = useState({});

  const storeUrl = (value: SetStateAction<string>) => {
    setStateUrl(value);
  };

  return (
    <MyContext.Provider value={{ dynamicAction, setDynamicAction }}>
      <div style={containerStyle}>
        <div style={leftPaneStyle}>
          <ChatBoxComponent setStoreUrl={storeUrl} />
        </div>
        <div style={rightPaneStyle}>
          <DynamicComponentWithNoSSR data={{}} url={stateUrl} />
        </div>
      </div>
    </MyContext.Provider>

  );
};

export default SplitScreen;