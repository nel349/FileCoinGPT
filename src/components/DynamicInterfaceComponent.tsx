import React from 'react';
import { Button, Input, Detail } from '../styles/components/DynamicInterfaceComponentStyles';

const DynamicComponent = ({ data }) => {
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
      default:
        return null;
    }
  };

  return (
    <div>
      {data.section1.map((componentData) => (
        <div key={componentData.name}>{renderComponent(componentData)}</div>
      ))}
    </div>
  );
};

export default DynamicComponent;