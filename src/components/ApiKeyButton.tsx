import React, { useState } from "react";

interface ApiKeyButtonProps {
    handleClick: (newApiKey: string) => void;
}

function ApiKeyButton({ handleClick }: ApiKeyButtonProps) {
    const [inputApiKey ] = useState("");

    const handleButtonClick = () => {
        handleClick(inputApiKey);
    };

    return (
        <div style={{ position: 'absolute', top: '0', right: '0' }}>
            <button 
                onClick={handleButtonClick} 
                style={{
                    backgroundColor: '#0070f3', 
                    color: '#fff', 
                    padding: '8px 16px', 
                    borderRadius: '4px', 
                    border: 'none', 
                    cursor: 'pointer',
                    margin: '8px'
                }}
            >
                Connect
            </button>
        </div>
    );
};

export default ApiKeyButton;