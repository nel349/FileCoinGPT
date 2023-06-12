import ChatBoxComponent from '../components/ChatBoxComponent';
import DynamicComponent from '../components/DynamicInterfaceComponent';
import { containerStyle, leftPaneStyle, rightPaneStyle } from '../styles/indexStyles';
import sampleDynamicComponent from '../../src/components/sampleDynamicComponent.json';

const SplitScreen = () => {

  return (
    <div style={containerStyle}>
      <div style={leftPaneStyle}>
        <ChatBoxComponent />
      </div>
      <div style={rightPaneStyle}>
        <DynamicComponent data={sampleDynamicComponent} />
      </div>
    </div>
  );
};

export default SplitScreen;