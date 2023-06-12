import ChatBoxComponent from '../components/ChatBoxComponent';
import DynamicComponent from '../components/DynamicInterfaceComponent';

const SplitScreen = () => {
  const containerStyle = {
    display: 'flex',
    height: '100vh',
  };

  const leftPaneStyle = {
    width: '50%',
    height: '100%',
    padding: '1rem',
    backgroundColor: '#FFFFFF',
  };

  const rightPaneStyle = {
    width: '50%',
    height: '100%',
    padding: '1rem',
    backgroundColor: '#F5F5F5',
  };

  const sampleData = {
    "layout": "layout1",
    "section1": [
  
      {
        "name": "button1",
        "label": "label1",
        "action": "action1",
        "type": "actionButton1"
      },
  
      {
        "name": "button2",
        "label": "label2",
        "action": "action2",
        "type": "actionButton2",
        "inputTextField": {
          "name": "inputTextField1",
                  "placeholder": "placeholder1",
                  "value": "value1",
                  "type": "inputTextField1"
        }
  
      },
      {
        "name": "Detail1",
        "type": "detailType1",
        "text": "text1"
      }
    ]
  }

  return (
    <div style={containerStyle}>
      <div style={leftPaneStyle}>
        <ChatBoxComponent />
      </div>
      <div style={rightPaneStyle}>
        <DynamicComponent data ={sampleData} />
      </div>
    </div>
  );
};

export default SplitScreen;