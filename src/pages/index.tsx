import { useState, useEffect, useRef } from "react";
// import styles from '@/styles/Home.module.css'

import axios from 'axios';
import TypingAnimation from "../components/TypingAnimation";

// const inter = Inter({ subsets: ['latin'] })

const ChatBubble = ({ type, message }) => {
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      const messageWidth = messageRef.current.offsetWidth;
      const bubbleStyle = messageRef.current.parentNode.style;
      bubbleStyle.width = 'fit-content';
      bubbleStyle.maxWidth = `${messageWidth}px`;
    }
  }, [message]);

  const bubbleStyle = {
    backgroundColor: type === 'user' ? '#5D3FD3' : '#8A7BEF',
    // alignItems: type === 'user' ? 'flex-start' : 'end',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    maxWidth: '50%',
  };

  const textStyle = {
    color: type === 'user' ? '#FFFFFF' : '#FFFFFF',
    fontSize: 16,
    maxWidth: '100%'
  };

  return (
    <div style={bubbleStyle}>
      <p style={textStyle} ref={messageRef}>{message}</p>
    </div>
  );
};

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])

    sendMessage(inputValue);
    
    setInputValue('');
  }

  const sendMessage = (message) => {
    const url = '/api/chat';

    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ "role": "user", "content": message }]
    };

    setIsLoading(true);

    axios.post(url, data).then((response) => {
      console.log(response);
      setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: response.data.choices[0].message.content }])
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'scroll', padding: 10 }}>
        {chatLog.map((chat, index) => (
          <ChatBubble key={index} type={chat.type} message={chat.message} />
        ))}
        {isLoading && <TypingAnimation />}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
        <input
          type="text"
          placeholder="iMessage"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          style={{ flex: 1, padding: 10, borderRadius: 20, border: 'none', marginRight: 10 }}
        />
        <button type="submit" style={{ backgroundColor: '#007AFF', color: '#FFFFFF', borderRadius: 20, padding: 10, border: 'none' }}>Send</button>
      </form>
    </div>
  );
}
