import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #0077cc;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Detail = styled.p`
  font-size: 14px;
  color: #333;
`;

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
          <div>
            <Input
              type="text"
              placeholder={componentData.inputTextField.placeholder}
              value={componentData.inputTextField.value}
            />
            <Button onClick={() => console.log(componentData.action)}>
              {componentData.label}
            </Button>
          </div>
        );
      case 'detailType1':
        return <Detail>{componentData.text}</Detail>;
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